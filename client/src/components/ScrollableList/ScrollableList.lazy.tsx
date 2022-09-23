import React, { lazy, Suspense } from 'react';

const LazyScrollableList = lazy(() => import('./ScrollableList'));

const ScrollableList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyScrollableList {...props} />
  </Suspense>
);

export default ScrollableList;
