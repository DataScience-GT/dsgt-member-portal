import React, { lazy, Suspense } from 'react';

const LazyPortal = lazy(() => import('./Portal'));

const Portal = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyPortal {...props} />
  </Suspense>
);

export default Portal;
