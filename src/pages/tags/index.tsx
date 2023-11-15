import { Row, Col, Table } from 'react-bootstrap';
import {
  useGetMyTagsQuery,
  useLazyUnLinkTagQuery,
} from '@/store/tag';
import Loader from '@/components/loader';
import { MainLayout } from '@/layouts/main/layout';
import { FaPen, FaTrash } from 'react-icons/fa';
import { UpdateTagModal } from '@/sections/tag/UpdateTagModal';
import { useState } from 'react';
import { showAlert } from '@/utils/show-alert';
import { toast } from 'react-toastify';

const LinkedCardsPage = () => {
  const [showUpdateTagModal, setShowUpdateTagModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>(null);

  const { data, isLoading, refetch } = useGetMyTagsQuery<any>({});
  const [unLinkTag] = useLazyUnLinkTagQuery();

  const handleEditTag = (tag: any) => {
    setSelectedTag(tag);
    setShowUpdateTagModal(true);
  };

  const handleDeleteTag = (tag: any) => {
    showAlert({
      icon: 'warning',
      title: 'Warning',
      text: 'Are you sure you want to delete this link?',
      showCancelButton: true,
      cancelButtonText: 'No',
      button1Text: 'Yes',
      onButton1Click: async () => {
        try {
          await unLinkTag(tag.id);
          toast.success('Device removed successfully');
          refetch();
        } catch (error: any) {
          toast.error(error?.data?.message || error.error);
        }
      },
    });
  };

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
                  <td style={{ textAlign: 'left' }}>{tag.url}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="icon-button"
                        onClick={() => {
                          handleEditTag(tag);
                        }}
                      >
                        <FaPen color="grey" />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() => {
                          handleDeleteTag(tag);
                        }}
                      >
                        <FaTrash color="red" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UpdateTagModal
            key={selectedTag?.id}
            show={showUpdateTagModal}
            setShow={setShowUpdateTagModal}
            tag={selectedTag}
          />
        </div>
      </Col>
    </Row>
  );
};

LinkedCardsPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);

export default LinkedCardsPage;
