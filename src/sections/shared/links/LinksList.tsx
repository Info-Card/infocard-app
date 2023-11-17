import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import LinkCard from './LinkCard';
import Link from 'next/link';
import {
  useDeleteLinkMutation,
  useGetLinksQuery,
} from '@/store/link';
import { useUpdateProfileMutation } from '@/store/profile';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { AddLinkModal } from './AddLinkModal';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/use-auth';

const LinksList = ({ profile }: any) => {
  const { id } = useParams();

  const { refetch }: any = useAuth();

  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [editModalKey, setEditModalKey] = useState(0);

  const { data } = useGetLinksQuery<any>({
    limit: 100,
    profile: profile.id,
  });

  const [updateProfile] = useUpdateProfileMutation();
  const [deleteLink] = useDeleteLinkMutation();

  const handleDeleteLink = (index: any) => {
    try {
      Swal.fire({
        title: '<strong>Warning</strong>',
        icon: 'warning',
        html: 'Are you sure you want to delete this link?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteLink(data.results[index].id).unwrap();
          toast.success('Link deleted');
        }
      });
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleEditLink = (index: any) => {
    setSelectedLink(data.results[index]);
    setShowAddLinkModal(true);
    setEditModalKey((prevKey) => prevKey + 1);
  };

  const handleDirectChange = async (linkId: string) => {
    try {
      await updateProfile({
        id: profile.id,
        body: { direct: linkId },
      }).unwrap();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="m-2 mt-2">
      <h4>Platforms & Analytics</h4>
      <Row className="g-2">
        {data?.results.map((link: any, index: any) => {
          return (
            <LinkCard
              key={link.id}
              link={link}
              isDirect={profile.isDirect}
              direct={profile.direct?.id}
              handleDirectChange={handleDirectChange}
              onEdit={() => handleEditLink(index)}
              onDelete={() => handleDeleteLink(index)}
            />
          );
        })}
      </Row>
      {!id && (
        <Card className="px-2 py-3 my-2 text-center">
          <Link
            href={'/edit-profile'}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            + Add Links and Contact Info
          </Link>
        </Card>
      )}
      <AddLinkModal
        key={editModalKey}
        show={showAddLinkModal}
        setShow={setShowAddLinkModal}
        platform={selectedLink?.platform}
        link={selectedLink}
      />
    </div>
  );
};

export default LinksList;
