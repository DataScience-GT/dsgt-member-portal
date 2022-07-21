import React, { lazy, Suspense } from 'react';

const LazyPortalSettings = lazy(() => import('./PortalSettings'));

const PortalSettings = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalSettings {...props} />
  </Suspense>
);

export default PortalSettings;
