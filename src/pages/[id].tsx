import { BASE_URL } from '@/configs/constants';
import { useAuth } from '@/hooks/use-auth';
import LinksList from '@/sections/shared/links/LinksList';
import { ExchangeContactModal } from '@/sections/profile/ExchangeContactModal';
import ProfileCard from '@/sections/shared/ProfileCard';
import { useGetTagQuery } from '@/store/tag';
import { showAlert } from '@/utils/show-alert';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

const ProfilePage = ({ profile, links }: any) => {
  const params = useParams();
  const router = useRouter();

  const { user }: any = useAuth();

  const [showExchangeContactModal, setShowExchangeContactModal] =
    useState(false);

  const { data: tag, error } = useGetTagQuery<any>(params?.id, {
    skip: profile !== null,
  });

  useEffect(() => {
    if (profile?.isDirect && profile?.direct) {
      var urlString =
        profile.direct.platform.type === 'url'
          ? profile.direct.value
          : profile.direct.platform.webBaseURL + profile.direct.value;
      window.open(urlString, '_self');
    }
  }, [profile]);

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

  if (profile?.isPrivate) {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <div className="text-center mt-5">
              <h1>Oops!</h1>
              <h2>Private Profile</h2>
              <p className="lead">
                Sorry, this profile is set to private.
              </p>
              <div className="mt-5">
                <Link href="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  if (profile?.isDirect && profile?.direct) {
    return <></>;
  }

  return (
    <Fragment>
      <main className="py-3">
        <Container>
          {profile && (
            <Row className="justify-content-center px-2">
              <Col xs={12} md={8} lg={7} xl={6}>
                <div className="d-flex justify-content-between mx-1">
                  <Link href="/">
                    <Image
                      src="/assets/images/logo.png"
                      alt="InfoCard"
                      width={80}
                      height={40}
                    />
                  </Link>
                  <Button
                    variant="outline-light"
                    style={{
                      color: profile?.themeColor ?? 'black',
                      border: `2px solid ${
                        profile?.themeColor ?? 'black'
                      }`,
                    }}
                    onClick={() => window.open('https://infocard.me')}
                  >
                    Get your card
                  </Button>
                </div>
                <ProfileCard profile={profile} />
                <div className="d-flex mt-3">
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
                  <div className="mt-3">
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
                    <LinksList profile={profile} links={links} />
                  </>
                )}
              </Col>
            </Row>
          )}
          <ExchangeContactModal
            show={showExchangeContactModal}
            setShow={setShowExchangeContactModal}
            profile={profile}
          />
        </Container>
      </main>
    </Fragment>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;

  try {
    const response = await fetch(
      `${BASE_URL}/v1/profiles/public/${id}`
    );
    const profile = await response.json();

    const linkResponse = await fetch(
      `${BASE_URL}/v1/links?profile=${id}&limit=100`
    );
    const { results: links } = await linkResponse.json();

    return {
      props: {
        profile,
        links,
      },
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return {
      props: {
        profile: null,
      },
    };
  }
};

ProfilePage.authGuard = false;

export default ProfilePage;
