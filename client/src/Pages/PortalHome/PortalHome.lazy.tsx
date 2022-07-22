import React, { lazy, Suspense } from 'react';

const LazyPortalHome = lazy(() => import('./PortalHome'));

const PortalHome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalHome {...props} />
  </Suspense>
);

export default PortalHome;
