import React, { lazy, Suspense } from 'react';

const LazyDocsSidebarHeader = lazy(() => import('./DocsSidebarHeader'));

const DocsSidebarHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsSidebarHeader {...props} />
  </Suspense>
);

export default DocsSidebarHeader;
