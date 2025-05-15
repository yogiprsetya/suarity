import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleSuccessResponse } from '~/backend/lib/handle-success-res';
import { File } from 'node:buffer';
import { handleInvalidRequest } from '~/backend/lib/handle-error-res';

const supabaseUrl = process.env.SUPABASE_URL ?? '';
const supabaseKey = process.env.SUPABASE_ANON_KEY ?? '';
const limit = 1 * 1024 * 1024; // 1MB

const supabase = createClient(supabaseUrl, supabaseKey);

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= limit, { message: 'File size must be under 1MB' })
  .refine((file) => ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type), {
    message: 'Only PNG and JPEG are allowed'
  });

export const uploadAvatar = async (req: NextRequest, supabaseBucket: string) => {
  try {
    const body = await req.formData();
    const file = body.get('file');

    const { success, error, data } = fileSchema.safeParse(file);

    if (!success) {
      return handleInvalidRequest(error);
    }

    const fileName = `${Date.now()}-${data.name}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(supabaseBucket)
      .upload(fileName, Buffer.from(await data.arrayBuffer()), {
        contentType: data.type,
        upsert: false
      });

    if (uploadError) {
      return handleInvalidRequest(uploadError.message);
    }

    return handleSuccessResponse(uploadData);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
