import React, { lazy, Suspense } from 'react';

const LazyMemberActionMenu = lazy(() => import('./MemberActionMenu'));

const MemberActionMenu = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMemberActionMenu {...props} />
  </Suspense>
);

export default MemberActionMenu;
