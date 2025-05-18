import { createClient } from '@supabase/supabase-js';
import { File } from 'node:buffer';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (file: File, supabaseBucket: string) => {
  const fileName = `${Date.now()}-${file.name}`;

  return supabase.storage
    .from(supabaseBucket)
    .upload(`public/${fileName}`, Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      upsert: false
    })
    .then(({ data, error }) => ({
      uploadData: data,
      uploadError: error
    }));
};
