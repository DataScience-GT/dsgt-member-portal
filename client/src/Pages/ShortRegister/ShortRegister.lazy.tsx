import React, { lazy, Suspense } from 'react';

const LazyShortRegister = lazy(() => import('./ShortRegister'));

const ShortRegister = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyShortRegister {...props} />
  </Suspense>
);

export default ShortRegister;
