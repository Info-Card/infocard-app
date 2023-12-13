import { useAuth } from '@/hooks/use-auth';
import {
  useGetProfileQuery,
  useGetPublicProfileQuery,
} from '@/store/profile';
import { useParams } from 'next/navigation';
import { Fragment, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Head from 'next/head';
import Loader from '@/components/loader';

const ProfilePage = () => {
  const params = useParams();

  const { user }: any = useAuth();

  const {
    data: profileData,
    isLoading: profileLoading,
    error: profileError,
  } = useGetProfileQuery<any>(params?.id, {
    skip: !params?.id || !user,
  });

  const {
    data: publicProfileData,
    isLoading: publicProfileLoading,
    error: publicProfileError,
  } = useGetPublicProfileQuery<any>(params?.id, {
    skip: !params?.id || user !== null,
  });

  const profile = publicProfileData || profileData;

  useEffect(() => {
    if (profile?.isDirect && profile?.direct) {
      var urlString =
        profile.direct.platform.type === 'url'
          ? profile.direct.value
          : profile.direct.platform.webBaseURL + profile.direct.value;
      window.open(urlString, '_self');
    }
  }, [profile]);

  return (
    <Fragment>
      <Head>
        <title>Info Card - Fastest Networking Technology</title>
        <meta
          name="description"
          content="Click to see my business card"
        />
      </Head>
      <main className="py-3">
        <Container>
          {(profileLoading || publicProfileLoading) && <Loader />}
          {profile?.name}
        </Container>
      </main>
    </Fragment>
  );
};

ProfilePage.authGuard = false;

export default ProfilePage;
