import { requireUserAuth } from '~/_backend/lib/protect-route';
import { db } from '~/config/db';
import { users } from '~/model/schema/users';
import { NextRequest } from 'next/server';
import { handleExpiredSession } from '~/_backend/lib/handle-error-res';
import { handleSuccessResponse } from '~/_backend/lib/handle-success-res';
import { eq } from 'drizzle-orm';

export const getUserByToken = async (req: NextRequest) => {
  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.select().from(users).where(eq(users.id, session.id));

      return handleSuccessResponse(result[0]);
    }

    return handleExpiredSession();
  });
};
