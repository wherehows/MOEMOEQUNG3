import '@emotion/react';
import { theme } from '@/utils/const';

type DeclaredTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends DeclaredTheme {}
}
