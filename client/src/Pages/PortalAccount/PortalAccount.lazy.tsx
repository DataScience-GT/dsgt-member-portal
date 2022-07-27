import React, { lazy, Suspense } from 'react';

const LazyPortalAccount = lazy(() => import('./PortalAccount'));

const PortalAccount = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalAccount {...props} />
  </Suspense>
);

export default PortalAccount;
