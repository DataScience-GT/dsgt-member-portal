import React, { lazy, Suspense } from 'react';

const LazyPortalCheckin = lazy(() => import('./PortalCheckin'));

const PortalCheckin = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalCheckin {...props} />
  </Suspense>
);

export default PortalCheckin;
