import React, { lazy, Suspense } from 'react';

const LazyRequestLink = lazy(() => import('./RequestLink'));

const RequestLink = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyRequestLink {...props} />
  </Suspense>
);

export default RequestLink;
