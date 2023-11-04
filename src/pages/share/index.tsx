// import MainLayout from '@/layouts/MainLayout';
// import Image from 'next/image';
// import { Button, Col, Row } from 'react-bootstrap';
// import QRCode from 'react-qr-code';
// import { toast } from 'react-toastify';
// import { FaCopy, FaShare } from 'react-icons/fa';
// import { useAuth } from '@/hooks/useAuth';
// import { HOST_URL } from '@/core/utils/constants';
// import { shareOnMobile } from 'react-mobile-share';

// export default function SharePage() {
//   const userInfo = useAuth();

//   return (
//     <MainLayout>
//       <Row className="mt-2">
//         <Col md={4} className="text-center m-auto">
//           <Image
//             src="/assets/images/logo.png"
//             alt=""
//             height={60}
//             width={120}
//             style={{ marginBottom: '50px' }}
//           />
//           <h3>Share QR Code</h3>
//           <div
//             style={{
//               background: 'white',
//               padding: '16px',
//             }}
//             className="mt-5"
//           >
//             <QRCode
//               value={`${HOST_URL}/${userInfo?.username}`}
//               size={180}
//             />
//           </div>
//           <p>{`${HOST_URL}/${userInfo?.username}`}</p>
//           <Button
//             type="submit"
//             variant="outline-primary"
//             size="sm"
//             className="m-2 rounded-circle bordered"
//             onClick={() => {
//               navigator.clipboard.writeText(
//                 `${HOST_URL}/${userInfo?.username}`
//               );
//               toast.success('Link copied');
//             }}
//           >
//             <FaCopy />
//           </Button>

//           <Button
//             type="submit"
//             variant="outline-primary"
//             size="sm"
//             className="m-2 rounded-circle"
//             onClick={() => {
//               shareOnMobile({
//                 url: `${HOST_URL}/${userInfo?.username}`,
//                 title: 'Connect to my profile using this link',
//               });
//             }}
//           >
//             <FaShare />
//           </Button>
//         </Col>
//       </Row>
//     </MainLayout>
//   );
// }
