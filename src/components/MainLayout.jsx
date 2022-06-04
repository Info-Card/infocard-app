import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default MainLayout;
