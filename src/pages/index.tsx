import { Row, Col, Alert, Button } from 'react-bootstrap';
import { useUpdateUserMutation } from '@/store/user';
import {
  useGetMyProfilesQuery,
  useUpdateProfileMutation,
} from '@/store/profile';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import CustomToggle from '@/components/custom-toggle';
import { MainLayout } from '@/layouts/main/layout';
import LinksList from '@/sections/shared/links/LinksList';
import { AddProductModal } from '@/sections/shared/products/AddProductModal';
import ProductsList from '@/sections/shared/products/ProductsList';
import ProfileCard from '@/sections/shared/ProfileCard';
import { useAuth } from '@/hooks/use-auth';
import Toggle from '@/components/toggle';
import { AddVideoModal } from '@/sections/shared/videos/AddVideoModal';
import VideosList from '@/sections/shared/videos/VideosList';
import { useRouter } from 'next/router';
import { useLazyLinkTagQuery } from '@/store/tag';
import { showAlert } from '@/utils/show-alert';

const HomePage = () => {
  const router = useRouter();
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] =
    useState(false);

  const { user, refetch, logout }: any = useAuth();
  const { data: profilesData } = useGetMyProfilesQuery<any>({});

  const [updateProfile] = useUpdateProfileMutation();
  const [updateUser] = useUpdateUserMutation();

  const [linkTag] = useLazyLinkTagQuery();

  useEffect(() => {
    if (user && localStorage.getItem('tag')) {
      const tag = JSON.parse(localStorage.getItem('tag') || '');
      showAlert({
        title: 'Activate Your Device',
        text: "Please click 'Activate' if you want to activate your device with the current logged-in account. Alternatively, choose 'Switch Account' if you wish to activate with a different account.",
        button1Text: user?.username
          ? `Activate to ${user.username}`
          : 'Activate',
        button2Text: 'Switch Account',
        onButton1Click: async () => {
          try {
            await linkTag(tag.id);
            toast.success('Device activated successfully');
          } catch (error: any) {
            toast.error(error?.data?.message || error.error);
          }
          localStorage.removeItem('tag');
        },
        onButton2Click: () => {
          showAlert({
            title: 'Activate Your Device',
            text: 'To Activate your product you need to login or register first',
            button1Text: 'Register',
            button2Text: 'Login',
            onButton1Click: () => {
              logout();
              router.replace('/auth/register');
            },
            onButton2Click: () => {
              logout();
            },
            onCancel: () => {
              localStorage.removeItem('tag');
            },
          });
        },
        onCancel: () => {
          localStorage.removeItem('tag');
        },
      });
    }
  }, [user, logout, linkTag, router]);

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

  const handleUploadVideo = () => {
    if ((user?.live?.videos || []).length >= 10) {
      toast.error('You have reached the video link upload limit');
    } else {
      setShowAddVideoModal(true);
    }
  };

  return (
    <Row className="justify-content-center px-2">
      <Col md={7} lg={5}>
        {profilesData && (
          <Toggle
            values={['Personal', 'Business']}
            selected={user?.live?.title}
            toggleChanged={handleSwitchProfile}
          />
        )}
        {!user.live?.name && (
          <Alert variant="dark" className="mt-2 text-center">
            Please complete your profile!
          </Alert>
        )}
        <ProfileCard profile={user.live} isStats={true} />
        <div className="d-flex mt-2">
          <Button
            variant="primary"
            className="flex-grow-1 mx-1"
            style={{
              width: '100%',
              backgroundColor: user.live?.themeColor ?? 'black',
              border: `2px solid ${user.live?.themeColor ?? 'black'}`,
            }}
            onClick={handleAddLink}
          >
            Add link
          </Button>
          <Button
            variant="primary"
            className="flex-grow-1 mx-1"
            style={{
              width: '100%',
              backgroundColor: user.live?.themeColor ?? 'black',
              border: `2px solid ${user.live?.themeColor ?? 'black'}`,
            }}
            onClick={handleUploadVideo}
          >
            Upload Video
          </Button>
        </div>
        {user.live?.bio && (
          <div className=" mt-2">
            <h4>About</h4>
            <p
              style={{
                overflowWrap: 'break-word',
                whiteSpace: 'pre-wrap',
              }}
            >
              {user.live?.bio}
            </p>
          </div>
        )}
        {user.live && (
          <>
            <VideosList profile={user.live} refetch={refetch} />
            <ProductsList profile={user.live} />
            <div className="d-flex justify-content-between mx-2">
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
          </>
        )}
      </Col>
      <AddProductModal
        show={showAddProductModal}
        setShow={setShowAddProductModal}
        profileId={user.live?.id}
      />
      <AddVideoModal
        show={showAddVideoModal}
        setShow={setShowAddVideoModal}
        profile={user.live}
        refetch={refetch}
      />
    </Row>
  );
};

HomePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default HomePage;
