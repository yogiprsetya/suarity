'use client';

import dynamic from 'next/dynamic';
import { useToast } from '~/hooks/useToast';

const Toast = dynamic(() => import('~/components/ui/toast').then((mod) => mod), {
  ssr: false
});

export const ToastProvider = () => {
  const { toasts } = useToast();

  return (
    <Toast.defaultProps>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}

      <ToastViewport />
    </Toast.defaultProps>
  );
};
