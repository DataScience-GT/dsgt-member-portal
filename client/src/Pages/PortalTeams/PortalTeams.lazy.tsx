import React, { lazy, Suspense } from 'react';

const LazyPortalTeams = lazy(() => import('./PortalTeams'));

const PortalTeams = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalTeams {...props} />
  </Suspense>
);

export default PortalTeams;
