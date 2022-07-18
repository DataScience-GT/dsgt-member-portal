import React, { lazy, Suspense } from 'react';

const LazyInputHelper = lazy(() => import('./InputHelper'));

const InputHelper = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInputHelper {...props} />
  </Suspense>
);

export default InputHelper;
