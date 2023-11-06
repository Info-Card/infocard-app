import { Fragment } from 'react';
import { Container } from 'react-bootstrap';

export const AuthLayout = (props: any) => {
  const { children } = props;

  return (
    <Fragment>
      <main className="py-3">
        <Container>{children}</Container>
      </main>
    </Fragment>
  );
};
