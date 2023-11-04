// import Loader from '@/core/components/loader';
// import MainLayout from '@/layouts/MainLayout';
// import { Row, Col, Table } from 'react-bootstrap';
// import { useGetMyTagsQuery } from '@/store/tag';

// export default function LinkedCardsPage() {
//   const { data, isLoading } = useGetMyTagsQuery<any>({});

//   return (
//     <MainLayout>
//       {isLoading && <Loader />}
//       <Row>
//         <Col xs={12}>
//           <div className="mt-5">
//             <h4>Linked Cards</h4>
//             <Table bordered hover responsive className="table-sm">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>URL</th>
//                   <th></th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {data?.results.map((tag: any) => (
//                   <tr key={tag.id}>
//                     <td>{tag.name || 'N/A'}</td>
//                     <td>{tag.url}</td>
//                     <td>
//                       {/* <LinkedCardsButtons
//                     strings={strings}
//                     tag={tag}
//                     setSelectedTag={setSelectedTag}
//                   /> */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//             {/* {selectedTag && (
//         <UpdateCardModal tag={selectedTag} setTag={setSelectedTag} />
//       )} */}
//           </div>
//         </Col>
//       </Row>
//     </MainLayout>
//   );
// }
