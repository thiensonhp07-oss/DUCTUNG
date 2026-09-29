import { useState, useEffect } from 'react';
import defaultPhoto from '../assets/images/bui_duc_tung_official_1790699395795.jpg';
import defaultHeroPhoto from '../assets/images/bui_duc_tung_hero_face_1790699411887.jpg';

const STORAGE_KEY = 'bdt_original_photo_raw';
export const DEFAULT_PHOTO = defaultPhoto;
export const DEFAULT_HERO_PHOTO = defaultHeroPhoto;

export function useOriginalPhoto() {
  const [photo, setPhoto] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_PHOTO;
  });

  const [heroPhoto, setHeroPhoto] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || DEFAULT_HERO_PHOTO;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPhoto(stored);
        setHeroPhoto(stored);
        setIsCustom(true);
      } else {
        setPhoto(DEFAULT_PHOTO);
        setHeroPhoto(DEFAULT_HERO_PHOTO);
        setIsCustom(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updatePhoto = (dataUrl: string) => {
    localStorage.setItem(STORAGE_KEY, dataUrl);
    setPhoto(dataUrl);
    setHeroPhoto(dataUrl);
    setIsCustom(true);
    window.dispatchEvent(new Event('bdt_photo_updated'));
  };

  const resetPhoto = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPhoto(DEFAULT_PHOTO);
    setHeroPhoto(DEFAULT_HERO_PHOTO);
    setIsCustom(false);
    window.dispatchEvent(new Event('bdt_photo_updated'));
  };

  useEffect(() => {
    const handleCustomEvent = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPhoto(stored);
        setHeroPhoto(stored);
        setIsCustom(true);
      } else {
        setPhoto(DEFAULT_PHOTO);
        setHeroPhoto(DEFAULT_HERO_PHOTO);
        setIsCustom(false);
      }
    };

    window.addEventListener('bdt_photo_updated', handleCustomEvent);
    return () => window.removeEventListener('bdt_photo_updated', handleCustomEvent);
  }, []);

  return {
    photo,
    heroPhoto,
    isCustom,
    updatePhoto,
    resetPhoto,
  };
}
