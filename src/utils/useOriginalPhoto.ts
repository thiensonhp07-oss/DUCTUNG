import { useState, useEffect } from 'react';

const STORAGE_KEY = 'bdt_original_photo_raw';
const DEFAULT_PHOTO = '/src/assets/images/bui_duc_tung_real_1790698846448.jpg';

export function useOriginalPhoto() {
  const [photo, setPhoto] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_PHOTO;
  });

  const [isCustom, setIsCustom] = useState<boolean>(() => {
    return !!localStorage.getItem(STORAGE_KEY);
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPhoto(stored);
        setIsCustom(true);
      } else {
        setPhoto(DEFAULT_PHOTO);
        setIsCustom(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updatePhoto = (dataUrl: string) => {
    localStorage.setItem(STORAGE_KEY, dataUrl);
    setPhoto(dataUrl);
    setIsCustom(true);
    // Dispatch a custom event for instant sync across components in the same window
    window.dispatchEvent(new Event('bdt_photo_updated'));
  };

  const resetPhoto = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPhoto(DEFAULT_PHOTO);
    setIsCustom(false);
    window.dispatchEvent(new Event('bdt_photo_updated'));
  };

  useEffect(() => {
    const handleCustomEvent = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPhoto(stored);
        setIsCustom(true);
      } else {
        setPhoto(DEFAULT_PHOTO);
        setIsCustom(false);
      }
    };

    window.addEventListener('bdt_photo_updated', handleCustomEvent);
    return () => window.removeEventListener('bdt_photo_updated', handleCustomEvent);
  }, []);

  return {
    photo,
    isCustom,
    updatePhoto,
    resetPhoto,
  };
}
