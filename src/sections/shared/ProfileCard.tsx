import styles from '@/assets/styles/home/HomeProfileCard.module.css';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getProfileImageUrl } from '@/utils/image-helpers';

const ProfileCard = ({ profile }: any) => {
  const params = useParams();

  return (
    <Row
      className={`${styles['profile-card']} mt-4`}
      style={{
        backgroundColor: profile?.color ?? 'black',
      }}
    >
      <Col xs={6} className="p-0">
        <img
          src={getProfileImageUrl(profile)}
          alt=""
          className={styles['profile-image']}
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
