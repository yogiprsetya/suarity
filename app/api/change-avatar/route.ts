import { NextRequest } from 'next/server';
import { uploadAvatar } from '~/backend/routes/user/change-avatar';

export const POST = (req: NextRequest) => uploadAvatar(req, 'avatar');
