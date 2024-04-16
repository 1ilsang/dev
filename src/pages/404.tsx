import { FunctionComponent } from 'react';

import NotFoundContainer from '~/404/Container';
import EmptyContainer from '~/404/Empty';
import useNotFound from '~/404/hooks/useNotFound';
import Footer from '~/shared/components/Footer';
import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/nav/Navbar';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';

const NotFound: FunctionComponent = () => {
  const { redirect } = useNotFound();

  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="not-found-layout">
        <Navbar />
        {redirect === null && <EmptyContainer />}
        {redirect === '' && <NotFoundContainer />}
        {typeof redirect === 'string' && redirect.length > 0 && (
          <EmptyContainer />
        )}
        <Footer />
      </main>
    </>
  );
};

export default NotFound;
