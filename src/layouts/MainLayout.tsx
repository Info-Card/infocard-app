import Header from '@/core/components/header';
import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';

const MainLayout = ({ children }: any) => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
    </Fragment>
  );
};

export default MainLayout;
