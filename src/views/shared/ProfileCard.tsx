import { getProfileImageUrl } from '@/core/utils/image-helpers';
import styles from '@/assets/styles/home/HomeProfileCard.module.css';
import { Col, Row } from 'react-bootstrap';
import { profile } from 'console';

const ProfileCard = ({ profile }: any) => {
  console.log(profile);

  return (
    <Row
      className={`${styles['profile-card']} mt-4`}
      style={{
        backgroundColor: profile.color ?? 'black',
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
        <h5>{profile.name}</h5>
        <h6>{profile.company}</h6>
        <h6>{profile.jobTitle}</h6>
        <p>
          <strong>Views: </strong>
          {profile.views}
          <br />
          <strong>Info Shared: </strong>
          {profile.infoShared}
        </p>
      </Col>
    </Row>
  );
};

export default ProfileCard;
