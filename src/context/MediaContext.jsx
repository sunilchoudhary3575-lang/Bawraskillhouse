import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeSiteMedia, updateSiteMediaInFirebase, uploadFileToFirebaseStorage } from '../services/firebaseAdminService';

// Static default asset imports
import heroWorkspaceDefault from '../assets/hero_workspace.png';
import welcome1Default from '../assets/welcome_1.jpg';
import welcome2Default from '../assets/welcome_2.jpg';
import welcome3Default from '../assets/welcome_3.jpg';
import welcome4Default from '../assets/welcome_4.png';
import welcome5Default from '../assets/welcome_5.jpg';
import welcome6Default from '../assets/welcome_6.jpg';
import cinemaCameraImgDefault from '../assets/cinematography_camera.png';
import droneImgDefault from '../assets/cinematography_drone.png';
import studioWorkstationsDefault from '../assets/studio_workstations.png';
import founderRawalSinghDefault from '../assets/founder_rawal_singh.jpg';
import aboutStory1Default from '../assets/about_story_1.jpg';
import aboutStory2Default from '../assets/about_story_2.jpg';
import courseGraphicDefault from '../assets/course_graphic.png';
import courseVideoDefault from '../assets/course_video.png';
import courseSocialDefault from '../assets/course_social.png';
import courseSocialPhoneDefault from '../assets/course_social_phone.png';
import coursePerformanceDefault from '../assets/course_performance.png';
import courseCinematography1Default from '../assets/course_cinematography_1.png';
import courseCinematography2Default from '../assets/course_cinematography_2.png';

// Create context
const MediaContext = createContext();

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

// Config metadata for the admin panel (Empty by default for custom dynamic options)
export const MEDIA_ITEMS = [];

const dbName = 'BawraMediaDB';
const storeName = 'media';

const getItemSafe = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const setItemSafe = (key, val) => {
  try {
    localStorage.setItem(key, val);
  } catch (e) {}
};

const removeItemSafe = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
};

const getDB = () => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof indexedDB === 'undefined') {
        return reject(new Error('IndexedDB not supported'));
      }
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    } catch (err) {
      reject(err);
    }
  });
};

const saveToDB = async (key, val) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(val, key);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
};

const getFromDB = async (key) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
};

const deleteFromDB = async (key) => {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
};

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState(() => {
    // Generate initial state combining defaults & localStorage overrides
    const initialMedia = {};
    MEDIA_ITEMS.forEach(item => {
      let stored = getItemSafe(`bawra_media_${item.key}`);
      // Bust old pen/book/unsplash course_graphic image to load the new custom user uploaded design monitor image
      if (item.key === 'course_graphic' && stored && (stored.includes('photo-1581291518633-83b4ebd1d83e') || stored.includes('photo-1561070791-26c113006238') || stored.includes('photo-1626785774573-4b799315345d'))) {
        removeItemSafe('bawra_media_course_graphic');
        stored = null;
      }
      if (item.key === 'course_video' && stored) {
        removeItemSafe('bawra_media_course_video');
        stored = null;
      }
      // Bust cached founder image to immediately load the new default image
      if (item.key === 'founderRawalSingh' && stored) {
        removeItemSafe('bawra_media_founderRawalSingh');
        stored = null;
      }
      // Bust cached social media course image to immediately load the new default image
      if (item.key === 'course_social' && stored) {
        removeItemSafe('bawra_media_course_social');
        stored = null;
      }
      if (item.key === 'course_social_phone' && stored) {
        removeItemSafe('bawra_media_course_social_phone');
        stored = null;
      }
      if (item.key === 'course_performance' && stored) {
        removeItemSafe('bawra_media_course_performance');
        stored = null;
      }

      if (item.key === 'course_cinematography_1' && stored) {
        removeItemSafe('bawra_media_course_cinematography_1');
        stored = null;
      }
      if (item.key === 'course_cinematography_2' && stored) {
        removeItemSafe('bawra_media_course_cinematography_2');
        stored = null;
      }
      // Bust cached welcome slideshow images to immediately load the new default images
      if ((item.key === 'welcome1' || item.key === 'welcome2' || item.key === 'welcome3' || item.key === 'welcome5' || item.key === 'welcome6') && stored) {
        removeItemSafe(`bawra_media_${item.key}`);
        stored = null;
      }
      // Bust cached about story slideshow images to immediately load the new default images
      if ((item.key === 'aboutStory1' || item.key === 'aboutStory2') && stored) {
        removeItemSafe(`bawra_media_${item.key}`);
        stored = null;
      }
      initialMedia[item.key] = stored || item.default;
    });
    return initialMedia;
  });

  useEffect(() => {
    // 1. Subscribe to Firestore real-time media updates
    const unsubscribe = subscribeSiteMedia((firestoreMedia) => {
      if (firestoreMedia && typeof firestoreMedia === 'object') {
        setMedia(prev => ({
          ...prev,
          ...firestoreMedia
        }));
      }
    });

    // 2. Load local IndexedDB fallbacks if any
    const loadIndexedDBMedia = async () => {
      const updatedMedia = { ...media };
      let changed = false;
      for (const item of MEDIA_ITEMS) {
        const stored = getItemSafe(`bawra_media_${item.key}`);
        if (stored === 'indexeddb_blob') {
          try {
            const blob = await getFromDB(item.key);
            if (blob) {
              updatedMedia[item.key] = URL.createObjectURL(blob);
              changed = true;
            }
          } catch (err) {
            console.error("Failed to read blob from IndexedDB for:", item.key, err);
          }
        }
      }
      if (changed) {
        setMedia(updatedMedia);
      }
    };
    loadIndexedDBMedia();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const updateMedia = async (key, value) => {
    if (value instanceof File || value instanceof Blob) {
      try {
        let finalUrl = '';
        try {
          // Attempt Firebase Storage Upload first for real cloud storage
          finalUrl = await uploadFileToFirebaseStorage(value, 'site_media');
        } catch (storageErr) {
          console.warn('Firebase Storage upload notice (using IndexedDB fallback):', storageErr);
          await saveToDB(key, value);
          finalUrl = URL.createObjectURL(value);
          setItemSafe(`bawra_media_${key}`, 'indexeddb_blob');
        }

        if (finalUrl && finalUrl.startsWith('http')) {
          await updateSiteMediaInFirebase(key, finalUrl);
        }

        setMedia(prev => ({
          ...prev,
          [key]: finalUrl,
        }));
        return finalUrl;
      } catch (err) {
        console.error("Failed to save media:", err);
        throw err;
      }
    } else if (typeof value === 'string' && value.trim() !== '') {
      const cleanVal = value.trim();
      setItemSafe(`bawra_media_${key}`, cleanVal);
      try {
        await updateSiteMediaInFirebase(key, cleanVal);
      } catch (err) {
        console.warn('Firestore site media update notice:', err);
      }
      try {
        await deleteFromDB(key);
      } catch (err) {}
      setMedia(prev => ({
        ...prev,
        [key]: cleanVal,
      }));
      return cleanVal;
    } else {
      removeItemSafe(`bawra_media_${key}`);
      try {
        await updateSiteMediaInFirebase(key, '');
      } catch (err) {}
      try {
        await deleteFromDB(key);
      } catch (err) {}
      const item = MEDIA_ITEMS.find(i => i.key === key);
      const defaultVal = item ? item.default : '';
      setMedia(prev => ({
        ...prev,
        [key]: defaultVal,
      }));
      return defaultVal;
    }
  };

  const resetMedia = async () => {
    MEDIA_ITEMS.forEach(item => {
      removeItemSafe(`bawra_media_${item.key}`);
    });
    try {
      const db = await getDB();
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).clear();
    } catch (err) {}

    const resetState = {};
    MEDIA_ITEMS.forEach(item => {
      resetState[item.key] = item.default;
    });
    setMedia(resetState);
  };

  return (
    <MediaContext.Provider value={{ media, updateMedia, resetMedia }}>
      {children}
    </MediaContext.Provider>
  );
};
