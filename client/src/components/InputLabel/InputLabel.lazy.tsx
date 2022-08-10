import React, { lazy, Suspense } from 'react';

const LazyInputLabel = lazy(() => import('./InputLabel'));

const InputLabel = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInputLabel {...props} />
  </Suspense>
);

export default InputLabel;
