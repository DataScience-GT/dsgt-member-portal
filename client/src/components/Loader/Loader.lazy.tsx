import React, { lazy, Suspense } from 'react';

const LazyLoader = lazy(() => import('./Loader'));

const Loader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLoader {...props} />
  </Suspense>
);

export default Loader;
