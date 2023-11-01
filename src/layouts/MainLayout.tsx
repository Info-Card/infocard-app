import Header from '@/core/components/header';
import PrivateRoute from '@/core/components/private-route';
import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

const MainLayout = ({ children }: any) => {
  return (
    <PrivateRoute>
      <Fragment>
        <Header />
        <main className="py-3">
          <Container>{children}</Container>
        </main>
      </Fragment>
    </PrivateRoute>
  );
};

export default MainLayout;
