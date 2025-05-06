import { updateProfileByToken } from '~/backend/routes/user/update-profile-by-token';
import { getUserByToken } from '~/backend/routes/user/get-user-by-token';

export const GET = getUserByToken;

export const PUT = updateProfileByToken;
