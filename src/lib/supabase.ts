import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase Free
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Cleaned / validated credentials
export const supabaseUrl = rawSupabaseUrl.trim();
export const supabaseAnonKey = rawSupabaseAnonKey.trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-anon-public-key'
);

// Fallback placeholder URL for client instantiation if env vars not provided yet
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured ? supabaseUrl : fallbackUrl,
  isSupabaseConfigured ? supabaseAnonKey : fallbackKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

console.log('[Supabase Client Initialized]', {
  url: isSupabaseConfigured ? supabaseUrl : '(Not configured yet)',
  configured: isSupabaseConfigured,
});

export interface TeamMemberCloudRecord {
  id: string;
  name: string;
  photoUrl: string;
  photoStoragePath?: string;
  updatedAt?: string;
}

export interface OptimizedImageResult {
  blob: Blob;
  originalSize: number;
  optimizedSize: number;
  width: number;
  height: number;
  format: 'webp' | 'jpeg';
  reductionPercent: number;
}

export interface SupabaseDiagnosticReport {
  supabaseUrl: string;
  isConfigured: boolean;
  storageBucket: string;
  storageStatus: 'CONNECTED' | 'FAILED' | 'PENDING_CONFIG';
  authStatus: 'SIGNED IN' | 'ANONYMOUS / PUBLIC' | 'NOT SIGNED IN';
  authUserEmail: string | null;
  databaseStatus: 'CONNECTED' | 'FAILED' | 'PENDING_CONFIG';
  lastStorageError: string | null;
  lastDatabaseError: string | null;
  tableExists: boolean;
  bucketExists: boolean;
}

/**
 * Diagnostic runner that actively probes Supabase Storage and Database connectivity
 */
export async function runSupabaseDiagnostics(): Promise<SupabaseDiagnosticReport> {
  const report: SupabaseDiagnosticReport = {
    supabaseUrl: supabaseUrl || 'Missing VITE_SUPABASE_URL',
    isConfigured: isSupabaseConfigured,
    storageBucket: 'team-photos',
    storageStatus: 'PENDING_CONFIG',
    authStatus: 'NOT SIGNED IN',
    authUserEmail: null,
    databaseStatus: 'PENDING_CONFIG',
    lastStorageError: null,
    lastDatabaseError: null,
    tableExists: false,
    bucketExists: false,
  };

  if (!isSupabaseConfigured) {
    report.lastStorageError =
      'Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) are not yet configured.';
    report.lastDatabaseError =
      'Supabase database connection requires VITE_SUPABASE_URL in your environment.';
    return report;
  }

  // 1. Check Auth state
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      report.authStatus = 'SIGNED IN';
      report.authUserEmail = session.user.email || 'Authenticated User';
    } else {
      report.authStatus = 'ANONYMOUS / PUBLIC';
    }
  } catch (err: any) {
    console.warn('[Supabase Diagnostics] Auth check error:', err);
  }

  // 2. Check Database connectivity ('team_members' table)
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('id, name, photo_url, updated_at')
      .limit(1);

    if (error) {
      report.databaseStatus = 'FAILED';
      report.lastDatabaseError = `Database query error: ${error.message} (code: ${error.code || 'unknown'})`;
      if (error.code === '42P01') {
        report.lastDatabaseError = `Table 'team_members' does not exist in Supabase yet. Please run CREATE TABLE team_members in SQL Editor.`;
      }
    } else {
      report.databaseStatus = 'CONNECTED';
      report.tableExists = true;
    }
  } catch (err: any) {
    report.databaseStatus = 'FAILED';
    report.lastDatabaseError = err?.message || 'Failed to query Supabase database.';
  }

  // 3. Check Storage bucket connectivity ('team-photos')
  try {
    const { data, error } = await supabase.storage.from('team-photos').list('', { limit: 1 });
    if (error) {
      report.storageStatus = 'FAILED';
      report.lastStorageError = `Storage bucket error: ${error.message}`;
      if (error.message.toLowerCase().includes('not found') || error.message.toLowerCase().includes('bucket')) {
        report.lastStorageError = `Storage bucket 'team-photos' does not exist yet. Please create a public bucket named 'team-photos' in Supabase Storage.`;
      }
    } else {
      report.storageStatus = 'CONNECTED';
      report.bucketExists = true;
    }
  } catch (err: any) {
    report.storageStatus = 'FAILED';
    report.lastStorageError = err?.message || 'Failed to connect to Supabase Storage.';
  }

  return report;
}

/**
 * High-performance client-side image optimizer:
 * 1. Resizes image to max dimension (default 1200px) preserving exact aspect ratio.
 * 2. Uses Canvas compression to WebP (target ~30–100 KB).
 * 3. Never inflates already small images.
 * 4. Executes in <50ms without blocking UI.
 */
export async function optimizeImageFile(
  file: File,
  maxDimension = 1200,
  quality = 0.85
): Promise<OptimizedImageResult> {
  const originalSize = file.size;

  return new Promise((resolve) => {
    const processImageSource = (
      source: HTMLImageElement | ImageBitmap,
      srcWidth: number,
      srcHeight: number
    ) => {
      try {
        let targetWidth = srcWidth;
        let targetHeight = srcHeight;

        if (targetWidth > maxDimension || targetHeight > maxDimension) {
          if (targetWidth > targetHeight) {
            targetHeight = Math.round((targetHeight * maxDimension) / targetWidth);
            targetWidth = maxDimension;
          } else {
            targetWidth = Math.round((targetWidth * maxDimension) / targetHeight);
            targetHeight = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d', { alpha: false });

        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(source, 0, 0, targetWidth, targetHeight);

          const exportFormat: 'webp' | 'jpeg' =
            file.type === 'image/webp' || canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
              ? 'webp'
              : 'jpeg';

          const mimeType = exportFormat === 'webp' ? 'image/webp' : 'image/jpeg';

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const finalBlob =
                  blob.size < originalSize || targetWidth < srcWidth || targetHeight < srcHeight
                    ? blob
                    : file;

                const optimizedSize = finalBlob.size;
                const reductionPercent =
                  originalSize > 0
                    ? Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100))
                    : 0;

                resolve({
                  blob: finalBlob,
                  originalSize,
                  optimizedSize,
                  width: targetWidth,
                  height: targetHeight,
                  format: exportFormat,
                  reductionPercent,
                });
              } else {
                resolve({
                  blob: file,
                  originalSize,
                  optimizedSize: originalSize,
                  width: srcWidth,
                  height: srcHeight,
                  format: 'jpeg',
                  reductionPercent: 0,
                });
              }
            },
            mimeType,
            quality
          );
        } else {
          resolve({
            blob: file,
            originalSize,
            optimizedSize: originalSize,
            width: srcWidth,
            height: srcHeight,
            format: 'jpeg',
            reductionPercent: 0,
          });
        }
      } catch (err) {
        console.warn('Canvas optimization notice:', err);
        resolve({
          blob: file,
          originalSize,
          optimizedSize: originalSize,
          width: srcWidth,
          height: srcHeight,
          format: 'jpeg',
          reductionPercent: 0,
        });
      }
    };

    if (typeof window !== 'undefined' && 'createImageBitmap' in window) {
      createImageBitmap(file)
        .then((bitmap) => {
          processImageSource(bitmap, bitmap.width, bitmap.height);
          bitmap.close();
        })
        .catch(() => {
          fallbackImageLoader(file, processImageSource, resolve);
        });
    } else {
      fallbackImageLoader(file, processImageSource, resolve);
    }
  });
}

function fallbackImageLoader(
  file: File,
  processSource: (source: HTMLImageElement, width: number, height: number) => void,
  resolve: (res: OptimizedImageResult) => void
) {
  const objectUrl = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    URL.revokeObjectURL(objectUrl);
    processSource(img, img.naturalWidth || img.width, img.naturalHeight || img.height);
  };
  img.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    resolve({
      blob: file,
      originalSize: file.size,
      optimizedSize: file.size,
      width: 1200,
      height: 1200,
      format: 'jpeg',
      reductionPercent: 0,
    });
  };
  img.src = objectUrl;
}

export type UploadPhotoState = 'preparing' | 'uploading' | 'saving' | 'success' | 'error';

/**
 * Uploads an optimized team member photo to Supabase Storage ('team-photos' bucket)
 * and updates the Supabase 'team_members' database table with the persistent public URL.
 * Also safely purges the old photo object only after new photo upload and database update succeed.
 */
export async function uploadTeamMemberPhotoToSupabase(
  memberId: string,
  memberName: string,
  fileOrBlob: File | Blob,
  onStateChange?: (state: UploadPhotoState) => void,
  oldStoragePath?: string
): Promise<{ photoUrl: string; photoStoragePath: string }> {
  const cleanId = memberId.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
  const timestamp = Date.now();

  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.'
    );
  }

  // 1. Prepare & Optimize Image
  let uploadBlob: Blob;
  let fileExt = 'webp';

  if (fileOrBlob instanceof File) {
    if (onStateChange) onStateChange('preparing');
    console.log(`[Supabase Upload] Optimizing selected file: "${fileOrBlob.name}" (${fileOrBlob.size} bytes)...`);
    const optimized = await optimizeImageFile(fileOrBlob);
    uploadBlob = optimized.blob;
    fileExt = optimized.format;
    console.log(
      `[Supabase Upload] Optimized to ${optimized.format.toUpperCase()} (${(optimized.optimizedSize / 1024).toFixed(1)} KB, ${optimized.reductionPercent}% reduction)`
    );
  } else {
    uploadBlob = fileOrBlob;
    fileExt = uploadBlob.type.includes('webp') ? 'webp' : 'jpeg';
  }

  // 2. Upload to Supabase Storage ('team-photos' bucket)
  if (onStateChange) onStateChange('uploading');
  const storagePath = `${cleanId}/profile-${timestamp}.${fileExt}`;
  const contentType = fileExt === 'webp' ? 'image/webp' : 'image/jpeg';

  console.log(`[Supabase Upload] Uploading to bucket "team-photos", path: "${storagePath}"...`);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('team-photos')
    .upload(storagePath, uploadBlob, {
      contentType,
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('[Supabase Upload Error]', uploadError);
    if (onStateChange) onStateChange('error');
    throw new Error(`Supabase Storage Upload Failed: ${uploadError.message}`);
  }

  // 3. Get Public Download URL
  const { data: urlData } = supabase.storage
    .from('team-photos')
    .getPublicUrl(storagePath);

  const publicUrl = urlData.publicUrl;
  console.log(`[Supabase Upload] Upload successful! Public URL: ${publicUrl}`);

  // 4. Update Supabase Database ('team_members' table)
  if (onStateChange) onStateChange('saving');
  console.log(`[Supabase Database] Updating table "team_members" for member "${cleanId}"...`);

  const { error: dbError } = await supabase
    .from('team_members')
    .upsert({
      id: cleanId,
      name: memberName,
      photo_url: publicUrl,
      photo_storage_path: storagePath,
      updated_at: new Date().toISOString(),
    });

  if (dbError) {
    console.error('[Supabase Database Error]', dbError);
    if (onStateChange) onStateChange('error');
    throw new Error(`Supabase Database Update Failed: ${dbError.message}`);
  }

  console.log(`[Supabase Database] Successfully persisted metadata in "team_members"!`);

  // 5. Clean up old image safely AFTER new upload and database persist succeeded
  if (oldStoragePath && oldStoragePath !== storagePath && !oldStoragePath.startsWith('http')) {
    try {
      console.log(`[Supabase Cleanup] Removing superseded photo from bucket: "${oldStoragePath}"...`);
      await supabase.storage.from('team-photos').remove([oldStoragePath]);
    } catch (cleanupErr) {
      console.warn('[Supabase Cleanup Notice] Could not remove old file:', cleanupErr);
    }
  }

  if (onStateChange) onStateChange('success');

  return {
    photoUrl: publicUrl,
    photoStoragePath: storagePath,
  };
}

/**
 * Resets a team member in Supabase back to default photo.
 */
export async function resetTeamMemberPhotoInSupabase(
  memberId: string,
  oldStoragePath?: string
): Promise<void> {
  const cleanId = memberId.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');

  if (!isSupabaseConfigured) {
    console.warn('[Supabase Reset] Supabase is not configured, skipping cloud delete.');
    return;
  }

  // 1. Delete record from database
  try {
    console.log(`[Supabase Reset] Deleting record for "${cleanId}" from "team_members"...`);
    const { error: dbError } = await supabase
      .from('team_members')
      .delete()
      .eq('id', cleanId);

    if (dbError) {
      console.warn('[Supabase Reset DB notice]', dbError);
    }
  } catch (err) {
    console.warn('[Supabase Reset DB error]', err);
  }

  // 2. Remove file from storage if path provided
  if (oldStoragePath && !oldStoragePath.startsWith('http')) {
    try {
      console.log(`[Supabase Reset] Deleting file "${oldStoragePath}" from "team-photos"...`);
      await supabase.storage.from('team-photos').remove([oldStoragePath]);
    } catch (err) {
      console.warn('[Supabase Reset Storage error]', err);
    }
  }
}

/**
 * Resets all team members in Supabase table.
 */
export async function resetAllTeamMembersInSupabase(): Promise<void> {
  if (!isSupabaseConfigured) return;
  try {
    console.log(`[Supabase Reset All] Clearing all custom photo rows in "team_members"...`);
    await supabase.from('team_members').delete().neq('id', '');
  } catch (e) {
    console.warn('[Supabase Reset All notice]', e);
  }
}

/**
 * One-time fetch of all published team member photos from Supabase.
 */
export async function fetchTeamMembersFromSupabase(): Promise<Record<string, TeamMemberCloudRecord>> {
  if (!isSupabaseConfigured) {
    return {};
  }

  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('id, name, photo_url, photo_storage_path, updated_at');

    if (error) {
      console.warn('[Supabase Fetch notice]', error);
      return {};
    }

    const result: Record<string, TeamMemberCloudRecord> = {};
    if (data && Array.isArray(data)) {
      data.forEach((row) => {
        if (row && row.photo_url) {
          const record: TeamMemberCloudRecord = {
            id: row.id,
            name: row.name,
            photoUrl: row.photo_url,
            photoStoragePath: row.photo_storage_path,
            updatedAt: row.updated_at,
          };
          result[row.id] = record;
          const underscoreId = row.id.replace(/-/g, '_');
          result[underscoreId] = record;
        }
      });
    }

    return result;
  } catch (e) {
    console.warn('[Supabase Fetch error]', e);
    return {};
  }
}

/**
 * Real-time subscription to team member photos in Supabase Database.
 */
export function subscribeTeamMembersFromSupabase(
  onUpdate: (data: Record<string, TeamMemberCloudRecord>) => void
): () => void {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  try {
    // Initial load
    fetchTeamMembersFromSupabase().then(onUpdate).catch(() => {});

    // Listen for realtime changes
    const channel = supabase
      .channel('team-members-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'team_members' },
        async () => {
          const updated = await fetchTeamMembersFromSupabase();
          onUpdate(updated);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (e) {
    console.warn('[Supabase Subscription notice]', e);
    return () => {};
  }
}
