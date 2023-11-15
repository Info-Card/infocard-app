import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './header';

export const MainLayout = (props: any) => {
  const { children } = props;
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
    </Fragment>
  );
};
