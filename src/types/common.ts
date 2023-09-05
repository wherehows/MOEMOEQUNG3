import { ReactNode } from 'react';

export type Theme = 'dark' | 'light';

export type StrictPropsWithChildren<P> = P & {
  children: ReactNode;
};
