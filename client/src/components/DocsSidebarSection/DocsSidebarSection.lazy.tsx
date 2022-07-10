import React, { lazy, Suspense } from 'react';

const LazyDocsSidebarSection = lazy(() => import('./DocsSidebarSection'));

const DocsSidebarSection = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsSidebarSection {...props} />
  </Suspense>
);

export default DocsSidebarSection;
