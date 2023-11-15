import { Col, Row } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getProfileImageUrl } from '@/utils/image-helpers';
import Image from 'next/image';

const ProfileCard = ({ profile }: any) => {
  const params = useParams();

  return (
    <Row
      className="profile-card mt-4"
      style={{
        backgroundColor: profile?.color ?? 'black',
      }}
    >
      <Col xs={6} className="p-0">
        <Image
          src={getProfileImageUrl(profile)}
          alt="profile-image"
          width={0}
          height={0}
          sizes="100vw"
          className="profile-image"
        />
      </Col>
      <Col xs={6}>
        <h5>{profile?.name}</h5>
        <h6>{profile?.company}</h6>
        <h6>{profile?.jobTitle}</h6>
        {!params?.id && (
          <p>
            <strong>Views: </strong>
            {profile?.views}
            <br />
            <strong>Info Shared: </strong>
            {profile?.infoShared}
          </p>
        )}
      </Col>
    </Row>
  );
};

export default ProfileCard;
