import { NextRequest } from 'next/server';
import { z } from 'zod';
import { handleSuccessResponse } from '~/backend/lib/handle-success-res';
import { handleInvalidRequest } from '~/backend/lib/handle-error-res';
import { uploadFile } from '../../lib/upload';
import { File } from 'node:buffer';
import { handleExpiredSession } from '~/backend/lib/handle-error-res';
import { db } from '~/config/db';
import { users } from '~/model/schema/users';
import { eq } from 'drizzle-orm';
import { requireUserAuth } from '~/backend/lib/protect-route';

const limit = 1 * 1024 * 1024; // 1MB
const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
const storageUrl = process.env.SUPABASE_STORAGE_URL;

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= limit, { message: 'File size must be under 1MB' })
  .refine((file) => fileTypes.includes(file.type), {
    message: 'Only PNG and JPEG are allowed'
  });

export const uploadAvatar = async (req: NextRequest) => {
  const body = await req.formData();
  const file = body.get('file');

  const { success, error, data } = fileSchema.safeParse(file);

  if (!success || !data) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const { uploadError, uploadData } = await uploadFile(data, 'avatars');

      if (uploadError) {
        return handleInvalidRequest(uploadError.message);
      }

      const result = await db
        .update(users)
        .set({ image: `${storageUrl}/${uploadData?.fullPath}` })
        .where(eq(users.id, session.id))
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
