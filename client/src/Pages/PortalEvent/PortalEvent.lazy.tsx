import React, { lazy, Suspense } from 'react';

const LazyPortalEvent = lazy(() => import('./PortalEvent'));

const PortalEvent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalEvent {...props} />
  </Suspense>
);

export default PortalEvent;
