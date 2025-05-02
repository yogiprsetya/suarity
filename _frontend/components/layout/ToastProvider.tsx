'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as ToasterBase,
  ToastTitle,
  ToastViewport
} from '~/components/ui/toast';
import { useToast } from '~/hooks/useToast';

export const ToastProvider = () => {
  const { toasts } = useToast();

  return (
    <ToasterBase>
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
    </ToasterBase>
  );
};
