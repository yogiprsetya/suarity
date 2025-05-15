import { requireUserAuth } from '../../lib/protect-route';
import { db } from '~/config/db';
import { users } from '~/model/schema/users';
import { NextRequest } from 'next/server';
import { handleExpiredSession, handleInvalidRequest } from '../../lib/handle-error-res';
import { handleSuccessResponse } from '../../lib/handle-success-res';
import { eq } from 'drizzle-orm';
import { createUpdateSchema } from 'drizzle-zod';
import { bodyParse } from '../../lib/body-parse';

const createReqSchema = createUpdateSchema(users).pick({
  username: true,
  name: true,
  email: true,
  bio: true,
  type: true
});

export const updateProfileByToken = async (req: NextRequest) => {
  const body = await bodyParse(req);
  const { data, success, error } = createReqSchema.safeParse(body);

  if (!success) {
    return handleInvalidRequest(error);
  }

  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db
        .update(users)
        .set({
          username: data.username,
          name: data.name,
          email: data.email,
          bio: data.bio,
          type: data.type
        })
        .where(eq(users.id, session.id))
        .returning();

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
