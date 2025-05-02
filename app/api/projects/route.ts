import { requireUserAuth } from 'api-lib/protect-route';
import { db } from '~/config/db';
import { projects } from '~/model/schema/projects';
import { NextRequest } from 'next/server';
import { handleExpiredSession } from 'api-lib/handle-error-res';
import { handleSuccessResponse } from 'api-lib/handle-success-res';
import { eq } from 'drizzle-orm';

export const GET = async (req: NextRequest) => {
  return requireUserAuth(req, async (session) => {
    if (session) {
      const result = await db.select().from(projects).where(eq(projects.id, session.id));

      return handleSuccessResponse(result ?? []);
    }

    return handleExpiredSession();
  });
};
