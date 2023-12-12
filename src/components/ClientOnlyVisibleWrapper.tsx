import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyVisibleWrapper {
  children: ReactNode;
}

const ClientOnlyVisibleWrapper = ({ children }: ClientOnlyVisibleWrapper) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      style={{
        visibility: isMounted ? 'initial' : 'hidden',
      }}
    >
      {children}
    </div>
  );
};

export default ClientOnlyVisibleWrapper;
