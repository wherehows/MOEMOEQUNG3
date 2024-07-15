import useIsMounted from '@/hooks/useIsMounted';
import { LAYOUT_PADDING } from '@/utils/const';
import { ReactNode } from 'react';

interface ClientOnlyVisibleWrapper {
  children: ReactNode;
}

const ClientOnlyVisibleWrapper = ({ children }: ClientOnlyVisibleWrapper) => {
  const isMounted = useIsMounted();

  return (
    <div
      style={{
        paddingTop: LAYOUT_PADDING,
        visibility: isMounted ? 'initial' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default ClientOnlyVisibleWrapper;
