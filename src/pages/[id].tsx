import Loader from '@/components/loader';
import { BASE_URL } from '@/configs/constants';
import { useAuth } from '@/hooks/use-auth';
import LinksList from '@/sections/shared/links/LinksList';
import ProductsList from '@/sections/shared/products/ProductsList';
import VideosList from '@/sections/shared/videos/VideosList';
import { ExchangeContactModal } from '@/sections/profile/ExchangeContactModal';
import ProfileCard from '@/sections/shared/ProfileCard';
import {
  useGetProfileQuery,
  useGetPublicProfileQuery,
} from '@/store/profile';
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
  console.log(user);

  const {
    data: profileData,
    isLoading,
    error: profileError,
  } = useGetProfileQuery<any>(params?.id, {
    skip: !params?.id || !user,
  });

  const { data: publicProfileData, error: publicProfileError } =
    useGetPublicProfileQuery<any>(params?.id, {
      skip: !params?.id || user,
    });

  const { data: tag, error } = useGetTagQuery<any>(params?.id, {
    skip: !profileError && !publicProfileError,
  });

  const profile = publicProfileData || profileData;

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
    if (error) {
      router.replace('/not-found');
    }
  }, [tag, router, user, error]);

  const handleSaveContact = async () => {
    window.open(
      `${BASE_URL}/v1/profiles/contact-card/${profile.id}`,
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
            <Row className="justify-content-center px-2">
              <Col md={7} lg={5}>
                <ProfileCard profile={profile} />
                <div className="d-flex mt-2">
                  <Button
                    className="flex-grow-1 mx-1"
                    style={{
                      width: '100%',
                      backgroundColor: profile?.themeColor ?? 'black',
                      border: `2px solid ${
                        profile?.themeColor ?? 'black'
                      }`,
                    }}
                    onClick={handleSaveContact}
                  >
                    Save Contact
                  </Button>
                  <Button
                    className="flex-grow-1 mx-1"
                    style={{
                      width: '100%',
                      backgroundColor: profile?.themeColor ?? 'black',
                      border: `2px solid ${
                        profile?.themeColor ?? 'black'
                      }`,
                    }}
                    onClick={handleExchangeContact}
                  >
                    Exchange
                  </Button>
                </div>
                {profile?.bio && (
                  <div className="mt-2">
                    <h4>About</h4>
                    <p
                      style={{
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {profile?.bio}
                    </p>
                  </div>
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
