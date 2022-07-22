import React, { lazy, Suspense } from 'react';

const LazyEventCard = lazy(() => import('./EventCard'));

const EventCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyEventCard {...props} />
  </Suspense>
);

export default EventCard;
