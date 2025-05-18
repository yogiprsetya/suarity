import { requireUserAuth } from '~/backend/lib/protect-route';
import { db } from '~/config/db';
import { users } from '~/model/schema/users';
import { NextRequest } from 'next/server';
import { handleExpiredSession } from '~/backend/lib/handle-error-res';
import { handleSuccessResponse } from '~/backend/lib/handle-success-res';
import { eq } from 'drizzle-orm';

export const getUserByToken = async (req: NextRequest) => {
  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.select().from(users).where(eq(users.id, session.id));

      return handleSuccessResponse({
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        emailVerified: result[0].emailVerified,
        image: result[0].image,
        bio: result[0].bio,
        username: result[0].username,
        type: result[0].type,
        createdAt: result[0].createdAt
      });
    }

    return handleExpiredSession();
  });
};
