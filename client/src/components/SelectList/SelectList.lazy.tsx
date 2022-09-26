import React, { lazy, Suspense } from 'react';

const LazySelectList = lazy(() => import('./SelectList'));

const SelectList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySelectList {...props} />
  </Suspense>
);

export default SelectList;
