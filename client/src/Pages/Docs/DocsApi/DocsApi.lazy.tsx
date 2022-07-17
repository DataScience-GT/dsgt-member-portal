import React, { lazy, Suspense } from 'react';

const LazyDocsApi = lazy(() => import('./DocsApi'));

const DocsApi = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDocsApi {...props} />
  </Suspense>
);

export default DocsApi;
