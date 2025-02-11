import type { FunctionComponent } from 'react';
import { MainContainer } from '~/shared/components/MainContainer';

export const EmptyContainer: FunctionComponent = () => {
  return <MainContainer className="flex flex-col items-center" />;
};
