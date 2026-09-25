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
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem(STORAGE_KEYS.SUPABASE_URL);
  const localKey = localStorage.getItem(STORAGE_KEYS.SUPABASE_KEY);

  const url = localUrl || envUrl || '';
  const key = localKey || envKey || '';

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
      if (error.code === '42P01') {
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
 * Saves entire portfolio data state to Supabase cloud
 */
export async function saveCloudPortfolio({ developerInfo, socialLinks, projects, pinHash }) {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase is not configured.');
  }

  const payload = {
    id: 'main',
    updated_at: new Date().toISOString(),
  };

  if (developerInfo !== undefined) payload.developer_info = developerInfo;
  if (socialLinks !== undefined) payload.social_links = socialLinks;
  if (projects !== undefined) payload.projects = projects;
  if (pinHash !== undefined) payload.pin_hash = pinHash;

  const { error } = await client
    .from(TABLE_NAME)
    .upsert(payload, { onConflict: 'id' });

  if (error) {
    throw new Error(error.message || 'Failed to save to Supabase cloud.');
  }

  return true;
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

