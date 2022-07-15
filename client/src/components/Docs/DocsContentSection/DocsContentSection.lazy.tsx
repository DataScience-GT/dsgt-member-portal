import React, { lazy, Suspense } from 'react';

const LazyDocsContentSection = lazy(() => import('./DocsContentSection'));

const DocsContentSection = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsContentSection {...props} />
  </Suspense>
);

export default DocsContentSection;
