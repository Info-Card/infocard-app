import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import QRCode from 'react-qr-code';

const QRPage = ({ history }) => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { rehydrated } = useSelector((state) => state._persist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push('/login');
      }
    }
  }, [history, authUser, dispatch, rehydrated]);

  return (
    <MainLayout>
      {authUser ? (
        <Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{authUser.username} - Info Card</title>
          </Helmet>

          <Row className="mt-2">
            <Col md={4} />
            <Col md={4} className="text-center">
              <h1>Info Card</h1>
              <p>Share QR Code</p>
              <div
                style={{
                  background: 'white',
                  padding: '16px',
                }}
                className="mt-5 mb-5"
              >
                <QRCode
                  value={`https://app.infocard.me/${authUser.username}`}
                  size={180}
                />
              </div>
              <Button type="submit" variant="primary">
                Share profile link
              </Button>
            </Col>
            <Col md={4} />
          </Row>
        </Fragment>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};

export default QRPage;
