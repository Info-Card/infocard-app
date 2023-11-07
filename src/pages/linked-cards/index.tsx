import { Row, Col, Table } from 'react-bootstrap';
import { useGetMyTagsQuery } from '@/store/tag';
import Loader from '@/components/loader';
import { MainLayout } from '@/layouts/main/layout';

const LinkedCardsPage = () => {
  const { data, isLoading } = useGetMyTagsQuery<any>({});

  return (
    <Row>
      {isLoading && <Loader />}
      <Col xs={12}>
        <div className="mt-5">
          <h4>Linked Cards</h4>
          <Table bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.results.map((tag: any) => (
                <tr key={tag.id}>
                  <td>{tag.name || 'N/A'}</td>
                  <td>{tag.url}</td>
                  <td>
                    {/* <LinkedCardsButtons
                    strings={strings}
                    tag={tag}
                    setSelectedTag={setSelectedTag}
                  /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* {selectedTag && (
        <UpdateCardModal tag={selectedTag} setTag={setSelectedTag} />
      )} */}
        </div>
      </Col>
    </Row>
  );
};

LinkedCardsPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);

export default LinkedCardsPage;
