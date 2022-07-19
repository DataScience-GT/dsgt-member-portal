import React, { lazy, Suspense } from 'react';

const LazyErrorText = lazy(() => import('./ErrorText'));

const ErrorText = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyErrorText {...props} />
  </Suspense>
);

export default ErrorText;
