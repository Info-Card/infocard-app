import Loader from '@/core/components/loader';
import Toggle from '@/core/components/toggle';
import MainLayout from '@/layouts/MainLayout';

import { Row, Col, Alert, Button, Stack } from 'react-bootstrap';
import ProfileCard from '@/views/shared/ProfileCard';
import { useGetMeQuery, useUpdateUserMutation } from '@/store/user';
import LinksList from '@/views/shared/links/LinksList';
import CustomToggle from '@/core/components/custom-toggle';
import {
  useGetMyProfilesQuery,
  useUpdateProfileMutation,
} from '@/store/profile';
import { toast } from 'react-toastify';

export default function Home() {
  const { data: user, isLoading, refetch } = useGetMeQuery<any>({});
  const { data: profilesData } = useGetMyProfilesQuery<any>({});

  const [updateProfile] = useUpdateProfileMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleSwitchProfile = async (value: string) => {
    try {
      await updateUser({
        live: profilesData.results.find((p: any) => p.title === value)
          .id,
      }).unwrap();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleAddLink = () => {};

  const handleUploadVideo = () => {};

  const handleDirectChange = async () => {
    try {
      await updateProfile({
        id: user.live.id,
        body: { directOn: !user.live.directOn },
      }).unwrap();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handlePrivateChange = async () => {
    try {
      await updateProfile({
        id: user.live.id,
        body: { isPrivate: !user.live.isPrivate },
      }).unwrap();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <MainLayout>
      {isLoading && <Loader />}
      <Row>
        <Col md={7} lg={5} className="m-auto">
          {user && (
            <>
              {profilesData && (
                <Toggle
                  values={profilesData.results.map(
                    (p: any) => p.title
                  )}
                  selected={user.live.title}
                  toggleChanged={handleSwitchProfile}
                />
              )}

              {!user.live?.name && (
                <Alert variant="dark" className="mt-2 text-center">
                  Please complete your profile!
                </Alert>
              )}
              <ProfileCard profile={user.live} />
              <div className="d-flex justify-content-between my-4">
                <Button
                  variant="primary"
                  className="flex-grow-1 mr-1"
                  style={{
                    width: '150px',
                    backgroundColor: user.live?.color ?? 'black',
                    border: `2px solid ${
                      user.live?.color ?? 'black'
                    }`,
                  }}
                  onClick={handleAddLink}
                >
                  Add link
                </Button>
                <Button
                  variant="primary"
                  className="flex-grow-1 ml-1"
                  style={{
                    width: '150px',
                    backgroundColor: user.live?.color ?? 'black',
                    border: `2px solid ${
                      user.live?.color ?? 'black'
                    }`,
                  }}
                  onClick={handleUploadVideo}
                >
                  Upload Video
                </Button>
              </div>
              {user.live?.bio && (
                <>
                  <h4>About</h4>
                  <p
                    style={{
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {user.live?.bio}
                  </p>
                </>
              )}
              <div className="d-flex justify-content-between">
                <CustomToggle
                  checked={user.live?.directOn}
                  onChange={handleDirectChange}
                  label="Direct"
                />
                <CustomToggle
                  checked={user.live?.isPrivate}
                  onChange={handlePrivateChange}
                  label="Private"
                />
              </div>
              <LinksList profile={user.live} />
            </>
          )}
        </Col>
      </Row>
    </MainLayout>
  );
}
