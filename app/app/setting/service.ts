import { headers } from 'next/headers';
import { apiHost } from '~/utils/api-host';

export const fetchUser = async () => {
  const res = await fetch(apiHost('me'), { headers: headers() });
  return res.json();
};
