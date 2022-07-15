import React, { lazy, Suspense } from 'react';

const LazyMiniHeader = lazy(() => import('./MiniHeader'));

const MiniHeader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMiniHeader {...props} />
  </Suspense>
);

export default MiniHeader;
