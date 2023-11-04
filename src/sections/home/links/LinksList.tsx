import React from 'react';
import { Card, Row } from 'react-bootstrap';
import LinkCard from './LinkCard';
import Link from 'next/link';
import { useGetLinksQuery } from '@/store/link';
import { useUpdateProfileMutation } from '@/store/profile';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';

const LinksList = ({ profile }: any) => {
  const { id } = useParams();

  const { data, refetch } = useGetLinksQuery<any>({
    profile: profile.id,
  });

  const [updateProfile] = useUpdateProfileMutation();

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
        {data?.results.map((link: any) => {
          return (
            <LinkCard
              key={link.id}
              link={link}
              directOn={profile.directOn}
              direct={profile.direct?.id}
              handleDirectChange={handleDirectChange}
            />
          );
        })}
      </Row>
      {!id && (
        <Card className="px-2 py-3 mb-2 text-center">
          <Link
            href={'/edit-profile'}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            + Add Links and Contact Info
          </Link>
        </Card>
      )}
    </div>
  );
};

export default LinksList;
