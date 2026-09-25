import { useState, useEffect } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_INQUIRIES,
  INITIAL_SETTINGS
} from '../data/seedData';

const KEYS = {
  PRODUCTS: 'marmo_products',
  CATEGORIES: 'marmo_categories',
  GALLERY: 'marmo_gallery',
  TESTIMONIALS: 'marmo_testimonials',
  INQUIRIES: 'marmo_inquiries',
  SETTINGS: 'marmo_settings',
  AUTH: 'marmo_admin_session'
};

export const initStorage = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.CATEGORIES)) {
    localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  }
  if (!localStorage.getItem(KEYS.GALLERY)) {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
  }
  if (!localStorage.getItem(KEYS.TESTIMONIALS)) {
    localStorage.setItem(KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
  }
  if (!localStorage.getItem(KEYS.INQUIRIES)) {
    localStorage.setItem(KEYS.INQUIRIES, JSON.stringify(INITIAL_INQUIRIES));
  }
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
  }
};

const notifyChange = (key) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('marmo-storage-update', { detail: { key } }));
  }
};

// Generic Getter
export const getItem = (key, fallback = []) => {
  initStorage();
  try {
    const data = localStorage.getItem(KEYS[key] || key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return fallback;
  }
};

// Generic Setter
export const setItem = (key, value) => {
  initStorage();
  try {
    const storageKey = KEYS[key] || key;
    localStorage.setItem(storageKey, JSON.stringify(value));
    notifyChange(key);
  } catch (e) {
    console.error(`Error writing ${key} to storage`, e);
  }
};

// Helper methods for entities
export const getProducts = () => getItem('PRODUCTS', INITIAL_PRODUCTS);
export const saveProducts = (products) => setItem('PRODUCTS', products);

export const getCategories = () => getItem('CATEGORIES', INITIAL_CATEGORIES);
export const saveCategories = (categories) => setItem('CATEGORIES', categories);

export const getGallery = () => getItem('GALLERY', INITIAL_GALLERY);
export const saveGallery = (items) => setItem('GALLERY', items);

export const getTestimonials = () => getItem('TESTIMONIALS', INITIAL_TESTIMONIALS);
export const saveTestimonials = (items) => setItem('TESTIMONIALS', items);

export const getInquiries = () => getItem('INQUIRIES', INITIAL_INQUIRIES);
export const saveInquiries = (items) => setItem('INQUIRIES', items);

export const addInquiry = (inquiry) => {
  const current = getInquiries();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    date: new Date().toISOString(),
    status: 'New',
    ...inquiry
  };
  saveInquiries([newInquiry, ...current]);
  return newInquiry;
};

export const getSettings = () => getItem('SETTINGS', INITIAL_SETTINGS);
export const saveSettings = (settings) => setItem('SETTINGS', settings);

// Auth helper
export const checkAdminAuth = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEYS.AUTH) === 'true';
};

export const setAdminAuth = (isAuthenticated) => {
  if (typeof window === 'undefined') return;
  if (isAuthenticated) {
    localStorage.setItem(KEYS.AUTH, 'true');
  } else {
    localStorage.removeItem(KEYS.AUTH);
  }
  notifyChange('AUTH');
};

// Custom React Hook to keep state synced automatically
export const useStorageData = (key, fallback) => {
  const [data, setData] = useState(() => getItem(key, fallback));

  useEffect(() => {
    initStorage();
    setData(getItem(key, fallback));

    const handleUpdate = (e) => {
      if (!e.detail || e.detail.key === key || !e.detail.key) {
        setData(getItem(key, fallback));
      }
    };

    window.addEventListener('marmo-storage-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('marmo-storage-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [key]);

  return [data, (val) => setItem(key, val)];
};
