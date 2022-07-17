import React, { lazy, Suspense } from 'react';

const LazyTag = lazy(() => import('./Tag'));

const Tag = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTag {...props} />
  </Suspense>
);

export default Tag;
