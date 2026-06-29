import React, { createContext, useContext, useState, useEffect } from 'react';

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
import courseGraphicDefault from '../assets/course_graphic.jpg';
import courseSocialDefault from '../assets/course_social.jpg';
import courseSocialPhoneDefault from '../assets/course_social_phone.jpg';
import coursePerformanceExtraDefault from '../assets/course_performance_extra.jpg';
import courseCinematography1Default from '../assets/course_cinematography_1.jpg';
import courseCinematography2Default from '../assets/course_cinematography_2.jpg';

// Create context
const MediaContext = createContext();

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

// Config metadata for the admin panel to easily enumerate items
export const MEDIA_ITEMS = [
  // SECTION: HOME PAGE
  {
    key: 'heroWorkspace',
    label: 'Hero Workspace (Main Image)',
    section: 'Home Page',
    type: 'image',
    default: heroWorkspaceDefault,
  },
  {
    key: 'welcome1',
    label: 'Classroom Slideshow Image 1',
    section: 'Home Page',
    type: 'image',
    default: welcome1Default,
  },
  {
    key: 'welcome2',
    label: 'Classroom Slideshow Image 2',
    section: 'Home Page',
    type: 'image',
    default: welcome2Default,
  },
  {
    key: 'welcome3',
    label: 'Classroom Slideshow Image 3',
    section: 'Home Page',
    type: 'image',
    default: welcome3Default,
  },
  {
    key: 'welcome4',
    label: 'Classroom Slideshow Image 4',
    section: 'Home Page',
    type: 'image',
    default: welcome4Default,
  },
  {
    key: 'welcome5',
    label: 'Classroom Slideshow Image 5',
    section: 'Home Page',
    type: 'image',
    default: welcome5Default,
  },
  {
    key: 'welcome6',
    label: 'Classroom Slideshow Image 6',
    section: 'Home Page',
    type: 'image',
    default: welcome6Default,
  },
  {
    key: 'cinemaCameraImg',
    label: 'Cinematography Camera Thumbnail',
    section: 'Home Page',
    type: 'image',
    default: cinemaCameraImgDefault,
  },
  {
    key: 'droneImg',
    label: 'Cinematography Drone Thumbnail',
    section: 'Home Page',
    type: 'image',
    default: droneImgDefault,
  },

  // SECTION: ABOUT PAGE
  {
    key: 'studioWorkstations',
    label: 'About Story (Studio Campus environment)',
    section: 'About Page',
    type: 'image',
    default: studioWorkstationsDefault,
  },
  {
    key: 'aboutStory1',
    label: 'About Story Image 1',
    section: 'About Page',
    type: 'image',
    default: aboutStory1Default,
  },
  {
    key: 'aboutStory2',
    label: 'About Story Image 2',
    section: 'About Page',
    type: 'image',
    default: aboutStory2Default,
  },
  {
    key: 'founderRawalSingh',
    label: 'Founder Rawal Singh Portrait',
    section: 'About Page',
    type: 'image',
    default: founderRawalSinghDefault,
  },

  // SECTION: COURSE LISTINGS
  {
    key: 'course_graphic',
    label: 'Graphic Designing Course Workstation',
    section: 'Course Details',
    type: 'image',
    default: courseGraphicDefault,
  },
  {
    key: 'course_video',
    label: 'Video Editing Course Workspace',
    section: 'Course Details',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'course_social',
    label: 'Social Media Strategy Workspace',
    section: 'Course Details',
    type: 'image',
    default: courseSocialDefault,
  },
  {
    key: 'course_social_phone',
    label: 'Social Media Phone Mockup',
    section: 'Course Details',
    type: 'image',
    default: courseSocialPhoneDefault,
  },
  {
    key: 'course_performance',
    label: 'Performance Advertising Analytics',
    section: 'Course Details',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'course_performance_extra',
    label: 'Performance Marketing Extra Dashboard',
    section: 'Course Details',
    type: 'image',
    default: coursePerformanceExtraDefault,
  },
  {
    key: 'course_cinematography_1',
    label: 'Cinematography Viewfinder Shoot',
    section: 'Course Details',
    type: 'image',
    default: courseCinematography1Default,
  },
  {
    key: 'course_cinematography_2',
    label: 'Cinematography Clapperboard Lenses',
    section: 'Course Details',
    type: 'image',
    default: courseCinematography2Default,
  },

  // SECTION: TESTIMONIAL VIDEOS
  {
    key: 'video_arjun',
    label: 'Video Story: Arjun Sharma (Testimonial 1)',
    section: 'Student Testimonials',
    type: 'video',
    default: '/01 low quality.mp4',
  },
  {
    key: 'video_priya',
    label: 'Video Story: Priya Rathore (Testimonial 2)',
    section: 'Student Testimonials',
    type: 'video',
    default: '/02 Low Quality.mp4',
  },
  {
    key: 'video_vikram',
    label: 'Video Story: Vikram Panwar (Testimonial 3)',
    section: 'Student Testimonials',
    type: 'video',
    default: '/03 Low Quality.mp4',
  },
  {
    key: 'video_mohit',
    label: 'Video Story: Mohit Gehlot (Testimonial 4)',
    section: 'Student Testimonials',
    type: 'video',
    default: '/04 Low Quality.mp4',
  },
  {
    key: 'video_karan',
    label: 'Video Story: Karan Bhati (Testimonial 5)',
    section: 'Student Testimonials',
    type: 'video',
    default: '/05 Low Quality.mp4',
  },
  {
    key: 'video_anjali',
    label: 'Video Story: Anjali Sharma (Testimonial 6)',
    section: 'Student Testimonials',
    type: 'video',
    default: '/01 low quality.mp4',
  },

  // SECTION: PORTFOLIO/WORK TESTIMONIAL GALLERY
  {
    key: 'portfolio_1',
    label: 'Premium Craft Gin Identity (Portfolio)',
    section: 'Portfolio Gallery',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'portfolio_2',
    label: 'Nike Phantom Cinematic Campaign (Portfolio)',
    section: 'Portfolio Gallery',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'portfolio_3',
    label: 'Liquid Fluid Motion Graphics Loop (Portfolio)',
    section: 'Portfolio Gallery',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'portfolio_4',
    label: 'Zephyr Organics Cosmetics Box (Portfolio)',
    section: 'Portfolio Gallery',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'portfolio_5',
    label: 'Minimalist Sneaker Social Assets (Portfolio)',
    section: 'Portfolio Gallery',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'portfolio_6',
    label: 'SaaS App Animated Interface Mockup (Portfolio)',
    section: 'Portfolio Gallery',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
];

const dbName = 'BawraMediaDB';
const storeName = 'media';

const getDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
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
      let stored = localStorage.getItem(`bawra_media_${item.key}`);
      // Bust old pen/book/unsplash course_graphic image to load the new custom user uploaded design monitor image
      if (item.key === 'course_graphic' && stored && (stored.includes('photo-1581291518633-83b4ebd1d83e') || stored.includes('photo-1561070791-26c113006238') || stored.includes('photo-1626785774573-4b799315345d'))) {
        localStorage.removeItem('bawra_media_course_graphic');
        stored = null;
      }
      // Bust cached founder image to immediately load the new default image
      if (item.key === 'founderRawalSingh' && stored) {
        localStorage.removeItem('bawra_media_founderRawalSingh');
        stored = null;
      }
      // Bust cached social media course image to immediately load the new default image
      if (item.key === 'course_social' && stored) {
        localStorage.removeItem('bawra_media_course_social');
        stored = null;
      }
      if (item.key === 'course_social_phone' && stored) {
        localStorage.removeItem('bawra_media_course_social_phone');
        stored = null;
      }
      if (item.key === 'course_performance_extra' && stored) {
        localStorage.removeItem('bawra_media_course_performance_extra');
        stored = null;
      }
      if (item.key === 'course_cinematography_1' && stored) {
        localStorage.removeItem('bawra_media_course_cinematography_1');
        stored = null;
      }
      if (item.key === 'course_cinematography_2' && stored) {
        localStorage.removeItem('bawra_media_course_cinematography_2');
        stored = null;
      }
      // Bust cached welcome slideshow images to immediately load the new default images
      if ((item.key === 'welcome1' || item.key === 'welcome2' || item.key === 'welcome3' || item.key === 'welcome5' || item.key === 'welcome6') && stored) {
        localStorage.removeItem(`bawra_media_${item.key}`);
        stored = null;
      }
      // Bust cached about story slideshow images to immediately load the new default images
      if ((item.key === 'aboutStory1' || item.key === 'aboutStory2') && stored) {
        localStorage.removeItem(`bawra_media_${item.key}`);
        stored = null;
      }
      initialMedia[item.key] = stored || item.default;
    });
    return initialMedia;
  });

  useEffect(() => {
    const loadIndexedDBMedia = async () => {
      const updatedMedia = { ...media };
      let changed = false;
      for (const item of MEDIA_ITEMS) {
        const stored = localStorage.getItem(`bawra_media_${item.key}`);
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
  }, []);

  const updateMedia = async (key, value) => {
    if (value instanceof File || value instanceof Blob) {
      try {
        await saveToDB(key, value);
        const objectUrl = URL.createObjectURL(value);
        localStorage.setItem(`bawra_media_${key}`, 'indexeddb_blob');
        setMedia(prev => ({
          ...prev,
          [key]: objectUrl,
        }));
        return objectUrl;
      } catch (err) {
        console.error("Failed to save media to IndexedDB:", err);
        throw err;
      }
    } else if (typeof value === 'string' && value.trim() !== '') {
      localStorage.setItem(`bawra_media_${key}`, value.trim());
      try {
        await deleteFromDB(key);
      } catch (err) {}
      setMedia(prev => ({
        ...prev,
        [key]: value.trim(),
      }));
      return value.trim();
    } else {
      localStorage.removeItem(`bawra_media_${key}`);
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
      localStorage.removeItem(`bawra_media_${item.key}`);
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
