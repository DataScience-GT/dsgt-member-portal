import React, { lazy, Suspense } from 'react';

const LazySuccessText = lazy(() => import('./SuccessText'));

const SuccessText = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySuccessText {...props} />
  </Suspense>
);

export default SuccessText;
