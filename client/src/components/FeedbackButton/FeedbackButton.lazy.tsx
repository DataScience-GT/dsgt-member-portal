import React, { lazy, Suspense } from 'react';

const LazyFeedbackButton = lazy(() => import('./FeedbackButton'));

const FeedbackButton = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyFeedbackButton {...props} />
  </Suspense>
);

export default FeedbackButton;
