import React, { lazy, Suspense } from 'react';

const LazyJsonBlock = lazy(() => import('./JsonBlock'));

const JsonBlock = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyJsonBlock {...props} />
  </Suspense>
);

export default JsonBlock;
