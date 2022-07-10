import React, { lazy, Suspense } from 'react';

const LazyDocsSidebarItem = lazy(() => import('./DocsSidebarItem'));

const DocsSidebarItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsSidebarItem {...props} />
  </Suspense>
);

export default DocsSidebarItem;
