const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const apiHost = (endpoint: string) => {
  if (!baseUrl) {
    throw new Error('API URL is not defined in environment variables');
  }

  return `${baseUrl}/${endpoint}`;
};
