// import Loader from '@/core/components/loader';
// import MainLayout from '@/layouts/MainLayout';
// import { Row, Col } from 'react-bootstrap';
// import { useGetMeQuery, useUpdateUserMutation } from '@/store/user';
// import Toggle from '@/core/components/toggle';
// import ProfileForm from '@/views/edit-profile/ProfileForm';
// import CategoriesList from '@/views/edit-profile/CategoriesList';
// import { toast } from 'react-toastify';
// import { useGetMyProfilesQuery } from '@/store/profile';
// import { useEffect, useState } from 'react';

// export default function EditProfile() {
//   const [profileFormKey, setProfileFormKey] = useState(0);

//   const { data: user, isLoading, refetch } = useGetMeQuery<any>({});
//   const { data: profilesData } = useGetMyProfilesQuery<any>({});

//   const [updateUser] = useUpdateUserMutation();

//   const handleSwitchProfile = async (value: string) => {
//     try {
//       await updateUser({
//         live: profilesData.results.find((p: any) => p.title === value)
//           .id,
//       }).unwrap();
//       refetch();
//     } catch (error: any) {
//       toast.error(error?.data?.message || error.error);
//     }
//   };

//   useEffect(() => {
//     if (user?.live) {
//       setProfileFormKey((prevKey: any) => prevKey + 1);
//     }
//   }, [user?.live]);

//   return (
//     <MainLayout>
//       {isLoading && <Loader />}
//       {user && (
//         <Row>
//           <Col md={12}>
//             <Toggle
//               values={['Personal', 'Business']}
//               selected={user.live.title}
//               toggleChanged={handleSwitchProfile}
//             />
//           </Col>
//           <Col sm={12} lg={5} xl={4}>
//             <ProfileForm key={profileFormKey} profile={user.live} />
//           </Col>
//           <Col sm={12} lg={7} xl={8} style={{ paddingTop: '20px' }}>
//             <CategoriesList profileId={user.live.id} />
//           </Col>
//         </Row>
//       )}
//     </MainLayout>
//   );
// }
