'use client';

import type { FunctionComponent } from 'react';
import NotFoundContainer from '~/404/Container';
import EmptyContainer from '~/404/Empty';
import useNotFound from '~/404/hooks/useNotFound';
import Footer from '~/shared/components/Footer';
import Navbar from '~/shared/components/nav/Navbar';

const NotFound: FunctionComponent = () => {
  const { redirect } = useNotFound();

  return (
    <main className="not-found-layout">
      <Navbar />
      {redirect === null && <EmptyContainer />}
      {redirect === '' && <NotFoundContainer />}
      {typeof redirect === 'string' && redirect.length > 0 && (
        <EmptyContainer />
      )}
      <Footer />
    </main>
  );
};

export default NotFound;
