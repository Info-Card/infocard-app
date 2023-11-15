import Loader from '@/components/loader';
import { BASE_URL } from '@/configs/constants';
import { useAuth } from '@/hooks/use-auth';
import LinksList from '@/sections/home/links/LinksList';
import ProductsList from '@/sections/home/products/ProductsList';
import VideosList from '@/sections/home/videos/VideosList';
import { ExchangeContactModal } from '@/sections/profile/ExchangeContactModal';
import ProfileCard from '@/sections/shared/ProfileCard';
import { useGetProfileQuery } from '@/store/profile';
import { useGetTagQuery } from '@/store/tag';
import { showAlert } from '@/utils/show-alert';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

const ProfilePage = () => {
  const params = useParams();
  const router = useRouter();

  const { user }: any = useAuth();

  const [showExchangeContactModal, setShowExchangeContactModal] =
    useState(false);

  const {
    data: profile,
    isLoading,
    error,
  } = useGetProfileQuery<any>(params?.id, { skip: !params?.id });

  const { data: tag } = useGetTagQuery<any>(params?.id, {
    skip: !error,
  });

  useEffect(() => {
    if (tag) {
      if (user) {
        localStorage.setItem('tag', JSON.stringify(tag));
        router.replace('/');
      } else {
        showAlert({
          title: 'Activate Your Device',
          text: 'To Activate your product you need to login or register first',
          button1Text: 'Register',
          button2Text: 'Login',
          onButton1Click: () => {
            router.replace('/auth/register');
          },
          onButton2Click: () => {
            router.replace('/auth/login');
          },
          onCancel: () => {
            localStorage.removeItem('tag');
          },
        });
      }
    }
  });

  const handleSaveContact = async () => {
    window.open(
      `${BASE_URL}/v1/profiles/contact-card/${params.id}`,
      '_blank'
    );
  };

  const handleExchangeContact = async () => {
    setShowExchangeContactModal(true);
  };

  return (
    <Fragment>
      <main className="py-3">
        <Container>
          {isLoading && <Loader />}

          {profile && (
            <Row>
              <Col md={7} lg={5} className="m-auto">
                <ProfileCard profile={profile} />
                <div className="d-flex justify-content-between my-4">
                  <Button
                    variant="primary"
                    className="flex-grow-1 mr-1"
                    style={{
                      width: '150px',
                      backgroundColor: profile?.color ?? 'black',
                      border: `2px solid ${
                        profile?.color ?? 'black'
                      }`,
                    }}
                    onClick={handleSaveContact}
                  >
                    Save Contact
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-grow-1 ml-1"
                    style={{
                      width: '150px',
                      backgroundColor: profile?.color ?? 'black',
                      border: `2px solid ${
                        profile?.color ?? 'black'
                      }`,
                    }}
                    onClick={handleExchangeContact}
                  >
                    Exchange
                  </Button>
                </div>
                {profile?.bio && (
                  <>
                    <h4>About</h4>
                    <p
                      style={{
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {profile?.bio}
                    </p>
                  </>
                )}
                {profile && (
                  <>
                    <VideosList profile={profile} />
                    <ProductsList profile={profile} />
                    <LinksList profile={profile} />
                  </>
                )}
              </Col>
            </Row>
          )}
          <ExchangeContactModal
            show={showExchangeContactModal}
            setShow={setShowExchangeContactModal}
            userId={profile?.user}
          />
        </Container>
      </main>
    </Fragment>
  );
};

ProfilePage.authGuard = false;

export default ProfilePage;
