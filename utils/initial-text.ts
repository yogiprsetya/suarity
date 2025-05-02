export const generateInitials = (name?: string, maxInitials?: number) => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const parts = name.split(' ').filter((part) => part.trim() !== '');

  let initials = parts.map((part) => part.charAt(0).toUpperCase()).join('');

  if (maxInitials && maxInitials > 0 && initials.length > maxInitials) {
    initials = initials.substring(0, maxInitials);
  }

  return initials;
};
