/**
 * Zero-dependency IndexedDB and LocalStorage persistent storage helper
 * Designed for saving high-resolution images, profile photos, and custom portfolio data.
 */

const DB_NAME = 'mahir_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'custom_assets';

function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function setAsset(key, value) {
  try {
    const db = await openDB();
    if (!db) {
      localStorage.setItem(`portfolio_asset_${key}`, value);
      return;
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`IndexedDB write error for ${key}:`, err);
    try {
      localStorage.setItem(`portfolio_asset_${key}`, value);
    } catch (e) {
      console.error('Storage quota exceeded:', e);
    }
  }
}

export async function getAsset(key) {
  try {
    const db = await openDB();
    if (!db) {
      return localStorage.getItem(`portfolio_asset_${key}`);
    }
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result !== undefined) {
          resolve(req.result);
        } else {
          // Fallback to localStorage
          resolve(localStorage.getItem(`portfolio_asset_${key}`));
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`IndexedDB read error for ${key}:`, err);
    return localStorage.getItem(`portfolio_asset_${key}`);
  }
}

export async function deleteAsset(key) {
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
    }
  } catch (err) {
    console.warn('Asset deletion error:', err);
  }
  localStorage.removeItem(`portfolio_asset_${key}`);
}

export async function clearAllAssets() {
  try {
    const db = await openDB();
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).clear();
    }
  } catch (err) {
    console.warn('Clear assets error:', err);
  }
  // Clear any local storage portfolio items
  Object.keys(localStorage).forEach((k) => {
    if (k.startsWith('portfolio_')) {
      localStorage.removeItem(k);
    }
  });
}

/**
 * Converts a browser File object to a Base64 string
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

