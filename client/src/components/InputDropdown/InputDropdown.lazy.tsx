import React, { lazy, Suspense } from 'react';

const LazyInputDropdown = lazy(() => import('./InputDropdown'));

const InputDropdown = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyInputDropdown {...props} />
  </Suspense>
);

export default InputDropdown;
