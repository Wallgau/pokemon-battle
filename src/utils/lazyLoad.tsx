import React, { Suspense, ComponentType, ReactNode } from "react";

export const lazyLoad = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  fallback: ReactNode = <div>Loading...</div>
) => {
  const LazyComponent = React.lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
