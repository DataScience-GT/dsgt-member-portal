import React, { lazy, Suspense } from 'react';

const LazyFeedback = lazy(() => import('./Feedback'));

const Feedback = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFeedback {...props} />
  </Suspense>
);

export default Feedback;
