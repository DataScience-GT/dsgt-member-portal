import React, { lazy, Suspense } from 'react';

const LazyPortalFeedback = lazy(() => import('./PortalFeedback'));

const PortalFeedback = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortalFeedback {...props} />
  </Suspense>
);

export default PortalFeedback;
