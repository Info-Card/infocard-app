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
import { useGetLinksQuery } from '@/store/link';
import { FaInfoCircle } from 'react-icons/fa';

const HomePage = () => {
  const router = useRouter();
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] =
    useState(false);

  const { user, refetch, logout }: any = useAuth();
  const { data: profilesData } = useGetMyProfilesQuery<any>({});
  const { data: linksData } = useGetLinksQuery<any>({
    limit: 100,
    profile: user.live.id,
  });

  const [updateProfile] = useUpdateProfileMutation();
  const [updateUser] = useUpdateUserMutation();

  const [linkTag] = useLazyLinkTagQuery();

  useEffect(() => {
    if (user && localStorage.getItem('tag')) {
      const tag = JSON.parse(localStorage.getItem('tag') || '');
      showAlert({
        title: 'Welcome to infocard',
        text: `Please click "${user.username}" to get started`,
        button1Text: user?.username
          ? `Link to ${user.username}`
          : 'Link',
        onButton1Click: async () => {
          try {
            await linkTag(tag.id);
            toast.success('Device linked successfully');
          } catch (error: any) {
            toast.error(error?.data?.message || error.error);
          }
          localStorage.removeItem('tag');
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
      if ((linksData.results ?? []).length > 0) {
        await updateProfile({
          id: user.live.id,
          body: {
            isDirect: !user.live.isDirect,
            direct: linksData.results[0],
          },
        }).unwrap();
        refetch();
      } else {
        toast.error('Please add platforms to enable this feature');
      }
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

  const handleInfoIconClick = (toggle: any) => {
    if (toggle == 'direct') {
      showAlert({
        title: 'Direct Info Card',
        text: 'The "Direct" option lets you send clients straight to a specific link, bypassing your full profile for quicker access.',
      });
    } else {
      showAlert({
        title: 'Private Info Card',
        text: 'Choosing "Private" for your profile restricts its visibility, keeping your information confidential.',
      });
    }
  };

  return (
    <Row className="justify-content-center px-2">
      <Col xs={12} md={10} lg={8} xl={6}>
        {profilesData && (
          <Toggle
            values={['Personal', 'Business']}
            selected={user?.live?.title}
            toggleChanged={handleSwitchProfile}
          />
        )}
        {!user.live?.name && (
          <Alert className="mt-3 text-center">
            Please complete your profile!
          </Alert>
        )}
        <ProfileCard profile={user.live} isStats={true} />
        <div className="d-flex my-3">
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
            Add Video
          </Button>
        </div>
        {user.live?.bio && (
          <div className=" mt-3">
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
              <div className="d-flex align-items-center">
                <FaInfoCircle
                  size={20}
                  onClick={() => handleInfoIconClick('direct')}
                />
                <CustomToggle
                  id="direct"
                  checked={user.live?.isDirect}
                  onChange={handleDirectChange}
                  label="Direct"
                />
              </div>
              <div className="d-flex align-items-center">
                <FaInfoCircle
                  size={20}
                  onClick={() => handleInfoIconClick('private')}
                />
                <CustomToggle
                  id="private"
                  checked={user.live?.isPrivate}
                  onChange={handlePrivateChange}
                  label="Private"
                />
              </div>
            </div>
            <LinksList
              profile={user.live}
              links={linksData?.results}
            />
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
