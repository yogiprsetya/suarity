/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from 'react';

type Falsy = false | 0 | '' | null | undefined;
type Condition<Value = unknown> = Value | Falsy;

export function If<Value = unknown>({
  condition,
  children,
  fallback
}: React.PropsWithoutRef<{
  condition: Condition<Value>;
  children: React.ReactNode | ((value: Value) => React.ReactNode);
  fallback?: React.ReactNode;
}>) {
  return useMemo(() => {
    if (condition) {
      if (typeof children === 'function') {
        return <>{children(condition)}</>;
      }

      return <>{children}</>;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    return null;
  }, [condition, fallback, children]);
}
