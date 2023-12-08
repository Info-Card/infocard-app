import { Col, Row } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getProfileImageUrl } from '@/utils/image-helpers';
import Image from 'next/image';

const ProfileCard = ({ profile }: any) => {
  const params = useParams();

  return (
    <Row
      className="profile-card m-1 mt-3"
      style={{
        backgroundColor: profile?.themeColor ?? 'black',
      }}
    >
      <Col xs={6} className="p-0" style={{ height: '100%' }}>
        <Image
          src={getProfileImageUrl(profile)}
          alt="profile-image"
          width={0}
          height={0}
          sizes="100vh"
          className="profile-image"
          style={{
            backgroundColor: profile?.themeColor ?? 'black',
            width: '100%',
            height: 'auto',
            minHeight: '150px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '10px 0px 0px 10px',
          }}
        />
      </Col>
      <Col xs={6}>
        <h6 style={{ fontWeight: 'bold' }}>{profile?.name}</h6>
        <p>{profile?.company}</p>
        <p>{profile?.jobTitle}</p>
        {!params?.id && (
          <p>
            Views: {profile?.views}
            <br />
            Info Shared: {profile?.infoShared}
          </p>
        )}
      </Col>
    </Row>
  );
};

export default ProfileCard;
