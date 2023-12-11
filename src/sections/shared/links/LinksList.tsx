import React, { useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import LinkCard from './LinkCard';
import Link from 'next/link';
import {
  useDeleteLinkMutation,
  useLazyGetLinkQuery,
  useUpdateLinkMutation,
} from '@/store/link';
import { useUpdateProfileMutation } from '@/store/profile';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { AddLinkModal } from './AddLinkModal';
import Swal from 'sweetalert2';
import { useAuth } from '@/hooks/use-auth';

interface LinksListParams {
  links: any[];
  profile: any;
}

const LinksList = ({ links, profile }: LinksListParams) => {
  const { id } = useParams();

  const { refetch }: any = useAuth();

  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<any>(null);
  const [editModalKey, setEditModalKey] = useState(0);

  const [updateProfile] = useUpdateProfileMutation();
  const [getLink] = useLazyGetLinkQuery();
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
        cancelButtonColor: 'black',
        confirmButtonColor: 'black',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteLink(links[index].id).unwrap();
          toast.success('Link deleted');
        }
      });
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const handleEditLink = (index: any) => {
    setSelectedLink(links[index]);
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

  const handleLinkClick = async (index: any) => {
    const link = links[index];
    if (id) {
      console.log(link);
      getLink({ id: link.id, isTapped: true });
    }
    var urlString =
      link.platform.type === 'url'
        ? link.value
        : link.platform.webBaseURL + link.value;
    window.open(urlString, '_blank');
  };

  if (id && (links ?? []).length < 1) {
    return <></>;
  }

  return (
    <div className="mt-2">
      <h4>{id ? 'Platforms' : 'Platforms & Analytics'}</h4>
      <div className={id ? 'm-2 card p-2' : 'm-2'}>
        <Row className="g-2">
          {links?.map((link: any, index: any) => {
            return (
              <LinkCard
                key={link.id}
                link={link}
                isDirect={profile.isDirect}
                direct={profile.direct?.id}
                handleDirectChange={handleDirectChange}
                handleLinkClick={() => handleLinkClick(index)}
                onEdit={() => handleEditLink(index)}
                onDelete={() => handleDeleteLink(index)}
              />
            );
          })}
        </Row>
      </div>
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
        profile={profile}
        platform={selectedLink?.platform}
        link={selectedLink}
        links={links}
      />
    </div>
  );
};

export default LinksList;
