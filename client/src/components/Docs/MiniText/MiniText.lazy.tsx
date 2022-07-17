import React, { lazy, Suspense } from 'react';

const LazyMiniText = lazy(() => import('./MiniText'));

const MiniText = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMiniText {...props} />
  </Suspense>
);

export default MiniText;
