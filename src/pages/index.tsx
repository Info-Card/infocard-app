import Loader from '@/core/components/loader';
import PrivateRoute from '@/core/components/private-route';
import Toggle from '@/core/components/toggle';
import MainLayout from '@/layouts/MainLayout';

import { Row, Col, Alert, Button } from 'react-bootstrap';
import ProfileCard from '@/views/shared/ProfileCard';
import { useGetMeQuery } from '@/store/user';
import { useGetLinksQuery } from '@/store/link';
import LinksList from '@/views/shared/links/LinksList';
import CustomToggle from '@/core/components/custom-toggle';

export default function Home() {
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetMeQuery<any>({});

  const { data: linksData } = useGetLinksQuery<any>({
    profile: '64e5ab3724cc861d5901bddf',
  });

  const handleSwitchProfile = (value: string) => {};

  const handleAddLink = () => {};

  const handleUploadVideo = () => {};

  const handleDirectChange = () => {};

  const handlePrivateChange = () => {};

  return (
    <PrivateRoute>
      <MainLayout>
        <Row>
          <Col md={7} lg={5} className="m-auto">
            {isLoading && <Loader />}
            {user && (
              <>
                <Toggle
                  values={['Personal', 'Business']}
                  selected={
                    user?.isPersonal ? 'Personal' : 'Business'
                  }
                  toggleChanged={handleSwitchProfile}
                />
                {!user.live?.name && (
                  <Alert variant="dark" className="mt-2 text-center">
                    Please complete your profile!
                  </Alert>
                )}
                <ProfileCard profile={user.live} />
                <div className="d-flex justify-content-between">
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
                {linksData && (
                  <LinksList
                    links={linksData.results}
                    direct={user.live.direct}
                  />
                )}
              </>
            )}
          </Col>
        </Row>
      </MainLayout>
    </PrivateRoute>
  );
}
