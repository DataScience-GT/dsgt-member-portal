import React, { lazy, Suspense } from 'react';

const LazyDivider = lazy(() => import('./Divider'));

const Divider = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDivider {...props} />
  </Suspense>
);

export default Divider;
