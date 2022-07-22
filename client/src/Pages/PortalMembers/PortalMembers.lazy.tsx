import React, { lazy, Suspense } from 'react';

const LazyPortalMembers = lazy(() => import('./PortalMembers'));

const PortalMembers = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalMembers {...props} />
  </Suspense>
);

export default PortalMembers;
