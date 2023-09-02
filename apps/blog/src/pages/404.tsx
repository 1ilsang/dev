import { FunctionComponent } from 'react';

import NotFoundContainer from '~/404/Container';
import Footer from '~/shared/components/Footer';
import MetaHeader from '~/shared/components/MetaHeader';
import Navbar from '~/shared/components/Navbar';
import { ImageUrl, MetaDescription, MetaTitle } from '~/shared/constants/blog';

const NotFound: FunctionComponent = () => {
  return (
    <>
      <MetaHeader
        title={MetaTitle.HOME}
        ogImageUrl={ImageUrl.HOME}
        description={MetaDescription.HOME}
      />
      <main className="not-found-layout">
        <Navbar />
        <NotFoundContainer />
        <Footer />
      </main>
    </>
  );
};

export default NotFound;
