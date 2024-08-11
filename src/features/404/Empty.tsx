import type { FunctionComponent } from 'react';
import { MainContainer } from '~/shared/components/MainContainer';

const EmptyContainer: FunctionComponent = () => {
  return <MainContainer className="flex flex-col items-center" />;
};

export default EmptyContainer;
