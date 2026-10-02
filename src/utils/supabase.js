/**
 * Supabase Client & Cloud Auto-Sync Engine
 * Enables real-time synchronization of portfolio data, PIN hash,
 * and media storage across all devices worldwide.
 */

import { createClient } from '@supabase/supabase-js';

const STORAGE_KEYS = {
  SUPABASE_URL: 'portfolio_supabase_url',
  SUPABASE_KEY: 'portfolio_supabase_anon_key',
};

// ============================================================================
// PASTE YOUR SUPABASE CREDENTIALS HERE FOR GLOBAL MULTI-DEVICE AUTO-SYNC
// (Paste your Project URL and Anon Key inside the quotes below)
// ============================================================================
export const DEFAULT_SUPABASE_URL = 'https://omiovlhpmlkxvwpaimbx.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_FGJ-s1FY49Rc9R8oo9fVzw_v6M4t_Cj';

const BUCKET_NAME = 'portfolio_images';
const TABLE_NAME = 'portfolio_data';

// SQL script for user to easily initialize their Supabase database
export const SUPABASE_SQL_SETUP = `-- 1. Create table for portfolio data
create table if not exists public.portfolio_data (
  id text primary key,
  developer_info jsonb,
  social_links jsonb,
  projects jsonb,
  pin_hash text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Enable Public Read & Anon Write
alter table public.portfolio_data enable row level security;

create policy "Allow public read" on public.portfolio_data 
  for select using (true);

create policy "Allow anon insert and update" on public.portfolio_data 
  for all using (true) with check (true);

-- 3. Create Storage Bucket for Images (Public)
insert into storage.buckets (id, name, public) 
values ('portfolio_images', 'portfolio_images', true)
on conflict (id) do nothing;

create policy "Public Access to portfolio_images" on storage.objects 
  for select using (bucket_id = 'portfolio_images');

create policy "Anon Upload to portfolio_images" on storage.objects 
  for insert with check (bucket_id = 'portfolio_images');

create policy "Anon Update on portfolio_images" on storage.objects 
  for update using (bucket_id = 'portfolio_images');

create policy "Anon Delete on portfolio_images" on storage.objects 
  for delete using (bucket_id = 'portfolio_images');
`;

export function getSupabaseCredentials() {
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined;
  const envKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined;
  const localUrl = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.SUPABASE_URL) : null;
  const localKey = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY) : null;

  const url = localUrl || envUrl || DEFAULT_SUPABASE_URL || '';
  const key = localKey || envKey || DEFAULT_SUPABASE_ANON_KEY || '';

  return { url: url.trim(), key: key.trim() };
}

export function saveSupabaseCredentials(url, key) {
  if (url) {
    localStorage.setItem(STORAGE_KEYS.SUPABASE_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEYS.SUPABASE_URL);
  }

  if (key) {
    localStorage.setItem(STORAGE_KEYS.SUPABASE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEYS.SUPABASE_KEY);
  }
}

export function isSupabaseConfigured() {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key);
}

let cachedClient = null;
let lastClientKey = '';

export function getSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) return null;

  const currentKey = `${url}:${key}`;
  if (cachedClient && lastClientKey === currentKey) {
    return cachedClient;
  }

  cachedClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  lastClientKey = currentKey;
  return cachedClient;
}

/**
 * Tests connection to Supabase table
 */
export async function testSupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) {
    return { ok: false, message: 'Supabase URL and Anon Key are missing.' };
  }

  try {
    const { data, error } = await client
      .from(TABLE_NAME)
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205' || (error.message && error.message.includes('portfolio_data'))) {
        return {
          ok: false,
          needsSetup: true,
          message: 'Table "portfolio_data" not found. Please run the SQL setup script.',
        };
      }
      return { ok: false, message: error.message };
    }

    return { ok: true, message: 'Connected to Supabase cloud successfully!' };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

/**
 * Fetches latest portfolio data from Supabase cloud
 */
export async function fetchCloudPortfolio() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from(TABLE_NAME)
      .select('*')
      .eq('id', 'main')
      .maybeSingle();

    if (error || !data) return null;

    return {
      developerInfo: data.developer_info,
      socialLinks: data.social_links,
      projects: data.projects,
      pinHash: data.pin_hash,
      updatedAt: data.updated_at,
    };
  } catch (err) {
    console.warn('Supabase fetchCloudPortfolio error:', err);
    return null;
  }
}

/**
 * Converts a Data URL (Base64) to a Blob object for Supabase Storage upload
 */
export function base64ToBlob(base64Str) {
  if (typeof base64Str !== 'string' || !base64Str.startsWith('data:image/')) {
    return null;
  }
  try {
    const parts = base64Str.split(';base64,');
    const contentType = parts[0].split(':')[1] || 'image/png';
    const raw = typeof window !== 'undefined' ? window.atob(parts[1]) : Buffer.from(parts[1], 'base64').toString('binary');
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  } catch (e) {
    console.warn('Failed to convert base64 to blob:', e);
    return null;
  }
}

/**
 * Saves entire portfolio data state to Supabase cloud.
 * Automatically offloads any heavy Base64 images to Supabase Storage first,
 * preventing PostgreSQL 'statement timeout' errors from giant JSONB payloads.
 */
export async function saveCloudPortfolio({ developerInfo, socialLinks, projects, pinHash }) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured.');
  }

  let sanitizedDeveloperInfo = developerInfo ? { ...developerInfo } : undefined;
  let sanitizedProjects = projects ? [...projects] : undefined;

  // 1. Offload profile image if it is Base64
  if (
    sanitizedDeveloperInfo &&
    typeof sanitizedDeveloperInfo.profileImage === 'string' &&
    sanitizedDeveloperInfo.profileImage.startsWith('data:image/')
  ) {
    try {
      const blob = base64ToBlob(sanitizedDeveloperInfo.profileImage);
      if (blob) {
        const publicUrl = await uploadCloudImage(blob, 'profile');
        sanitizedDeveloperInfo.profileImage = publicUrl;
      }
    } catch (e) {
      console.warn('Could not offload base64 profile image to storage, reverting to default:', e);
      sanitizedDeveloperInfo.profileImage = '/profile.jpg';
    }
  }

  // 2. Offload project screenshots if they are Base64
  if (sanitizedProjects && Array.isArray(sanitizedProjects)) {
    sanitizedProjects = await Promise.all(
      sanitizedProjects.map(async (proj) => {
        const updatedProj = { ...proj };
        // Check primary image
        if (typeof updatedProj.image === 'string' && updatedProj.image.startsWith('data:image/')) {
          try {
            const blob = base64ToBlob(updatedProj.image);
            if (blob) {
              updatedProj.image = await uploadCloudImage(blob, 'projects');
            }
          } catch (e) {
            console.warn('Could not offload base64 project image, reverting to default:', e);
            updatedProj.image = '/projects/cineverse.png';
          }
        }
        // Check screenshots array
        if (Array.isArray(updatedProj.screenshots)) {
          updatedProj.screenshots = await Promise.all(
            updatedProj.screenshots.map(async (shot) => {
              if (typeof shot === 'string' && shot.startsWith('data:image/')) {
                try {
                  const blob = base64ToBlob(shot);
                  if (blob) {
                    return await uploadCloudImage(blob, 'projects');
                  }
                } catch (e) {
                  return updatedProj.image || '/projects/cineverse.png';
                }
              }
              return shot;
            })
          );
        }
        return updatedProj;
      })
    );
  }

  const payload = {
    id: 'main',
    updated_at: new Date().toISOString(),
  };

  if (sanitizedDeveloperInfo !== undefined) payload.developer_info = sanitizedDeveloperInfo;
  if (socialLinks !== undefined) payload.social_links = socialLinks;
  if (sanitizedProjects !== undefined) payload.projects = sanitizedProjects;
  if (pinHash !== undefined) payload.pin_hash = pinHash;

  // Execute upsert with retry on transient timeout
  let attempts = 0;
  while (attempts < 2) {
    attempts++;
    const { error } = await client
      .from(TABLE_NAME)
      .upsert(payload, { onConflict: 'id' });

    if (!error) {
      return {
        ok: true,
        sanitizedDeveloperInfo,
        sanitizedProjects,
      };
    }

    if (
      error.message &&
      (error.message.includes('statement timeout') || error.message.includes('canceling statement')) &&
      attempts < 2
    ) {
      await new Promise((res) => setTimeout(res, 1200));
      continue;
    }

    throw new Error(error.message || 'Failed to save to Supabase cloud.');
  }

  return { ok: true, sanitizedDeveloperInfo, sanitizedProjects };
}

/**
 * Uploads an image file directly to Supabase Storage bucket and returns public HTTPS URL
 */
export async function uploadCloudImage(file, folder = 'general') {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured for image uploads.');
  }

  const fileExt = file.name ? file.name.split('.').pop() : 'png';
  const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${folder}/${cleanName}`;

  const { error: uploadError } = await client.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Upload to storage failed: ${uploadError.message}`);
  }

  const { data: publicUrlData } = client.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * Updates just the PIN hash in the cloud
 */
export async function updateCloudPin(newPinHash) {
  const client = getSupabaseClient();
  if (!client) return false;

  const { error } = await client
    .from(TABLE_NAME)
    .upsert({ id: 'main', pin_hash: newPinHash, updated_at: new Date().toISOString() }, { onConflict: 'id' });

  return !error;
}

