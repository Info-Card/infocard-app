import { Row, Col, Alert, Button } from 'react-bootstrap';
import { useUpdateUserMutation } from '@/store/user';
import {
  useGetMyProfilesQuery,
  useUpdateProfileMutation,
} from '@/store/profile';
import { toast } from 'react-toastify';
import { useState } from 'react';
import CustomToggle from '@/components/custom-toggle';
import { MainLayout } from '@/layouts/main/layout';
import LinksList from '@/sections/home/links/LinksList';
import { AddProductModal } from '@/sections/home/products/AddProductModal';
import ProductsList from '@/sections/home/products/ProductsList';
import ProfileCard from '@/sections/shared/ProfileCard';
import { useAuth } from '@/hooks/use-auth';
import Toggle from '@/components/toggle';

const HomePage = () => {
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] =
    useState(false);

  const { user, refetch }: any = useAuth();
  const { data: profilesData } = useGetMyProfilesQuery<any>({});

  const [updateProfile] = useUpdateProfileMutation();
  const [updateUser] = useUpdateUserMutation();

  if (!user) {
    return;
  }

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

  const handleDirectChange = async () => {
    try {
      await updateProfile({
        id: user.live.id,
        body: { isDirect: !user.live.isDirect },
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

  const handleAddLink = () => {
    setShowAddProductModal(true);
  };

  const handleUploadVideo = () => {};

  return (
    <Row>
      <Col md={7} lg={5} className="m-auto">
        {profilesData && (
          <Toggle
            values={['Personal', 'Business']}
            selected={user.live.title}
            toggleChanged={handleSwitchProfile}
          />
        )}

        {!user.live?.name && (
          <Alert variant="dark" className="mt-2 text-center">
            Please complete your profile!
          </Alert>
        )}
        <ProfileCard profile={user.live} isStats={true} />
        <div className="d-flex justify-content-between my-4">
          <Button
            variant="primary"
            className="flex-grow-1 mr-1"
            style={{
              width: '150px',
              backgroundColor: user.live?.color ?? 'black',
              border: `2px solid ${user.live?.color ?? 'black'}`,
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
              border: `2px solid ${user.live?.color ?? 'black'}`,
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
        <ProductsList profile={user.live} />
        <div className="d-flex justify-content-between">
          <CustomToggle
            id="direct"
            checked={user.live?.isDirect}
            onChange={handleDirectChange}
            label="Direct"
          />
          <CustomToggle
            id="private"
            checked={user.live?.isPrivate}
            onChange={handlePrivateChange}
            label="Private"
          />
        </div>
        <LinksList profile={user.live} />
      </Col>
      <AddProductModal
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        profileId={user.live?.id}
      />
    </Row>
  );
};

HomePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default HomePage;
