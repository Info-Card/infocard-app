import { Fragment } from 'react';
import { Header } from './header';
import { Container } from 'react-bootstrap';

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
