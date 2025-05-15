'use client';

import { UploadIcon } from 'lucide-react';
import { FC } from 'react';
import { Button } from '~/frontend/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';
import { generateInitials } from '~/utils/initial-text';
import { Input } from '~/frontend/components/ui/input';
import { useToast } from '~/_frontend/hooks/useToast';

type Props = {
  image: string;
  name: string;
};

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

export const ChangeAvatar: FC<Props> = ({ image, name }) => {
  const { toast } = useToast();

  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-28">
        <AvatarImage src={image} alt="Avatar" />
        <AvatarFallback>{generateInitials(name)}</AvatarFallback>
      </Avatar>

      <Input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          if (!allowedTypes.includes(file.type)) {
            toast({
              title: 'Invalid file format',
              description: 'Please select a JPEG or PNG image.',
              variant: 'destructive'
            });
            e.target.value = '';
            return;
          }

          if (file.size > MAX_FILE_SIZE) {
            toast({
              title: 'File size too large',
              description: 'Please select a file smaller than 1MB.',
              variant: 'destructive'
            });
            e.target.value = '';
            return;
          }

          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              // Handle the base64 image data here
              console.log(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
        id="avatar-upload"
      />

      <Button asChild variant="outline" size="sm">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <UploadIcon className="mr-2" />
          Change
        </label>
      </Button>
    </div>
  );
};
