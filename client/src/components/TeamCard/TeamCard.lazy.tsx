import React, { lazy, Suspense } from 'react';

const LazyTeamCard = lazy(() => import('./TeamCard'));

const TeamCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTeamCard {...props} />
  </Suspense>
);

export default TeamCard;
