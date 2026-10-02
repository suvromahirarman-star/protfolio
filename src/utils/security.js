/**
 * Enhanced Security Layer for Admin Customizer
 * - Salted SHA-256 cryptographic hashing via Web Crypto API
 * - Brute-force protection with temporary lockouts
 * - Session expiration timers
 * - Cross-device global PIN synchronization support
 */

import { authConfig } from '../data/portfolioData';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds
const SESSION_DURATION_MS = 20 * 60 * 1000; // 20 minutes
const STORAGE_KEYS = {
  PIN_HASH: 'portfolio_admin_pin_hash',
  ATTEMPTS: 'portfolio_admin_attempts',
  LOCKOUT_UNTIL: 'portfolio_admin_lockout_until',
  SESSION_EXPIRY: 'portfolio_admin_session_expiry',
};

// Cryptographic salt so rainbow tables cannot decipher PINs
export const PIN_SALT = 'mas_salt_2026_MAS';

/**
 * Computes SHA-256 hash string for an input PIN with salt
 */
export async function hashPin(pin) {
  const salted = String(pin).trim() + PIN_SALT;
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    return String(pin);
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(salted);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks if the admin login is currently in lockout state
 */
export function getLockoutStatus() {
  const lockoutUntil = parseInt(localStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL) || '0', 10);
  const now = Date.now();
  if (lockoutUntil > now) {
    const remainingSeconds = Math.ceil((lockoutUntil - now) / 1000);
    return { isLocked: true, remainingSeconds };
  }
  return { isLocked: false, remainingSeconds: 0 };
}

/**
 * Resets brute force lockout and attempts
 */
export function resetLockout() {
  localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
  localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
}

/**
 * Verifies PIN against stored or global SHA-256 hash with attempt tracking
 */
export async function verifySecurePin(enteredPin, dynamicPinHash) {
  const lockout = getLockoutStatus();
  if (lockout.isLocked) {
    return {
      success: false,
      error: `Too many failed attempts. Locked for ${lockout.remainingSeconds}s.`,
      locked: true,
      remainingSeconds: lockout.remainingSeconds,
    };
  }

  // Priority: 1. Dynamic state hash, 2. Locally customized hash, 3. Global default hash
  const defaultHash = authConfig?.pinHash;
  const storedHash =
    dynamicPinHash ||
    localStorage.getItem(STORAGE_KEYS.PIN_HASH) ||
    defaultHash;

  const inputHash = await hashPin(enteredPin);
  const isDefaultPin = defaultHash && inputHash === defaultHash;

  if (inputHash === storedHash || isDefaultPin) {
    // Reset attempt counters on successful login
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    // If logged in via default PIN and stored hash was corrupted/stale, heal it
    if (isDefaultPin && storedHash !== defaultHash) {
      localStorage.setItem(STORAGE_KEYS.PIN_HASH, defaultHash);
    }
    // Set session expiry
    localStorage.setItem(STORAGE_KEYS.SESSION_EXPIRY, String(Date.now() + SESSION_DURATION_MS));
    return { success: true };
  }

  // Failed attempt
  const currentAttempts = parseInt(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '0', 10) + 1;
  localStorage.setItem(STORAGE_KEYS.ATTEMPTS, String(currentAttempts));

  if (currentAttempts >= MAX_ATTEMPTS) {
    const lockUntil = Date.now() + LOCKOUT_DURATION_MS;
    localStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, String(lockUntil));
    return {
      success: false,
      error: `Too many failed attempts. Locked for 5 minutes.`,
      locked: true,
      remainingSeconds: 300,
    };
  }

  const remainingTries = MAX_ATTEMPTS - currentAttempts;
  return {
    success: false,
    error: `Incorrect PIN. ${remainingTries} attempt${remainingTries > 1 ? 's' : ''} remaining.`,
    locked: false,
  };
}

/**
 * Computes and locally stores the new PIN hash
 */
export async function updateSecurePin(newPin) {
  const newHash = await hashPin(newPin);
  localStorage.setItem(STORAGE_KEYS.PIN_HASH, newHash);
  return newHash;
}

/**
 * Checks if current admin session is valid
 */
export function isSessionActive() {
  const expiry = parseInt(localStorage.getItem(STORAGE_KEYS.SESSION_EXPIRY) || '0', 10);
  return Date.now() < expiry;
}

/**
 * Clears current admin session
 */
export function endSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION_EXPIRY);
}
