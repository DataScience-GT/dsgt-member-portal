import React, { lazy, Suspense } from 'react';

const LazyParameter = lazy(() => import('./Parameter'));

const Parameter = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyParameter {...props} />
  </Suspense>
);

export default Parameter;
