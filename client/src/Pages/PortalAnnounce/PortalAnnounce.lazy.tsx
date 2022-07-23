import React, { lazy, Suspense } from 'react';

const LazyPortalAnnounce = lazy(() => import('./PortalAnnounce'));

const PortalAnnounce = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalAnnounce {...props} />
  </Suspense>
);

export default PortalAnnounce;
