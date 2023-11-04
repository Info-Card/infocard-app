// import Loader from '@/core/components/loader';
// import { BASE_URL, PROFILES_URL } from '@/core/utils/constants';
// import { useGetProfileQuery } from '@/store/profile';
// import LinksList from '@/views/home/links/LinksList';
// import ProductsList from '@/views/home/products/ProductsList';
// import { ExchangeContactModal } from '@/views/profile/ExchangeContactModal';
// import ProfileCard from '@/views/shared/ProfileCard';
// import { useParams } from 'next/navigation';
// import { Fragment, useState } from 'react';
// import { Button, Col, Container, Row } from 'react-bootstrap';

// export default function ProdilePage() {
//   const params = useParams();

//   const [showExchangeContactModal, setShowExchangeContactModal] =
//     useState(false);

//   const { data: profile, isLoading } = useGetProfileQuery<any>(
//     params?.id,
//     { skip: !params?.id }
//   );

//   const handleSaveContact = async () => {
//     window.open(
//       `${BASE_URL}/v1/profiles/contact-card/${params.id}`,
//       '_blank'
//     );
//   };

//   const handleExchangeContact = async () => {
//     setShowExchangeContactModal(true);
//   };

//   return (
//     <Fragment>
//       <main className="py-3">
//         <Container>
//           {isLoading && <Loader />}
//           <Row>
//             <Col md={7} lg={5} className="m-auto">
//               <ProfileCard profile={profile} />
//               <div className="d-flex justify-content-between my-4">
//                 <Button
//                   variant="primary"
//                   className="flex-grow-1 mr-1"
//                   style={{
//                     width: '150px',
//                     backgroundColor: profile?.color ?? 'black',
//                     border: `2px solid ${profile?.color ?? 'black'}`,
//                   }}
//                   onClick={handleSaveContact}
//                 >
//                   Save Contact
//                 </Button>
//                 <Button
//                   variant="primary"
//                   className="flex-grow-1 ml-1"
//                   style={{
//                     width: '150px',
//                     backgroundColor: profile?.color ?? 'black',
//                     border: `2px solid ${profile?.color ?? 'black'}`,
//                   }}
//                   onClick={handleExchangeContact}
//                 >
//                   Exchange
//                 </Button>
//               </div>
//               {profile?.bio && (
//                 <>
//                   <h4>About</h4>
//                   <p
//                     style={{
//                       overflowWrap: 'break-word',
//                       whiteSpace: 'pre-wrap',
//                     }}
//                   >
//                     {profile?.bio}
//                   </p>
//                 </>
//               )}
//               {profile && (
//                 <>
//                   <ProductsList profile={profile} />
//                   <LinksList profile={profile} />
//                 </>
//               )}
//             </Col>
//           </Row>
//           <ExchangeContactModal
//             show={showExchangeContactModal}
//             setShow={setShowExchangeContactModal}
//             userId={profile?.user}
//           />
//         </Container>
//       </main>
//     </Fragment>
//   );
// }
