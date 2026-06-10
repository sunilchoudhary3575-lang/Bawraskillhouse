import React, { createContext, useContext, useState, useEffect } from 'react';

// Static default asset imports
import heroWorkspaceDefault from '../assets/hero_workspace.png';
import welcome1Default from '../assets/welcome_1.jpg';
import welcome2Default from '../assets/welcome_2.png';
import welcome3Default from '../assets/welcome_3.jpg';
import welcome4Default from '../assets/welcome_4.png';
import welcome5Default from '../assets/welcome_5.png';
import cinemaCameraImgDefault from '../assets/cinematography_camera.png';
import droneImgDefault from '../assets/cinematography_drone.png';
import studioWorkstationsDefault from '../assets/studio_workstations.png';
import founderRawalSinghDefault from '../assets/founder_rawal_singh.png';

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
    default: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
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
    default: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'course_performance',
    label: 'Performance Advertising Analytics',
    section: 'Course Details',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  },
  {
    key: 'course_cinematography',
    label: 'Cinematography DSLR Shooting',
    section: 'Course Details',
    type: 'image',
    default: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80',
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

export const MediaProvider = ({ children }) => {
  const [media, setMedia] = useState(() => {
    // Generate initial state combining defaults & localStorage overrides
    const initialMedia = {};
    MEDIA_ITEMS.forEach(item => {
      const stored = localStorage.getItem(`bawra_media_${item.key}`);
      initialMedia[item.key] = stored || item.default;
    });
    return initialMedia;
  });

  const updateMedia = (key, value) => {
    if (value && value.trim() !== '') {
      localStorage.setItem(`bawra_media_${key}`, value.trim());
      setMedia(prev => ({
        ...prev,
        [key]: value.trim(),
      }));
    } else {
      // If empty value is sent, treat as resetting that key
      localStorage.removeItem(`bawra_media_${key}`);
      const item = MEDIA_ITEMS.find(i => i.key === key);
      setMedia(prev => ({
        ...prev,
        [key]: item ? item.default : '',
      }));
    }
  };

  const resetMedia = () => {
    MEDIA_ITEMS.forEach(item => {
      localStorage.removeItem(`bawra_media_${item.key}`);
    });
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
