import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import { getLink } from 'state/ducks/links/actions';
import { getProfile } from 'state/ducks/profile/actions';
import Loader from 'components/Loader';
import { multilanguage } from 'redux-multilanguage';

const MedicalCardPage = ({ history, match, strings }) => {
  const linkId = match.params.linkId;
  const { profile, user, loading } = useSelector((state) => state.profile);
  const {
    medicalCard,
    link,
    loading: linkLoading,
  } = useSelector((state) => state.links);
  const { rehydrated } = useSelector((state) => state._persist);

  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (link && link.id === linkId) {
        dispatch(getProfile(link.profile));
      } else {
        dispatch(getLink(linkId));
      }
    }
  }, [history, dispatch, link, linkId, rehydrated]);

  return (
    <Container>
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Info Card</title>
        </Helmet>
        <Row>
          <Col md={4} />
          <Col md={4}>
            {loading || linkLoading ? <Loader /> : ''}
            {medicalCard && profile && (
              <div className="profile-card">
                <div>
                  {profile.image && profile.image !== '' ? (
                    <img
                      src={process.env.REACT_APP_API_URL + profile.image}
                      alt=""
                      className="twPc-avatarImg1"
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + '/user.png'}
                      alt=""
                      className="twPc-avatarImg1"
                    />
                  )}
                  <div className="twPc-divUser">
                    <div className="twPc-divName pt-4">{profile.name}</div>
                    <span>
                      @<span>{user.username}</span>
                    </span>
                    <br />
                    <br />
                    <br />
                  </div>

                  <div class="twPc-divStats">
                    <div className="text-center">
                      <div
                        className="h4 p-1 text-light"
                        style={{ backgroundColor: profile.color }}
                      >
                        {strings['Emergency Contact']}
                      </div>
                      <div className="p-2 h4">
                        <a href={`tell://${medicalCard.emergencyContact}`}>
                          {medicalCard.emergencyContact}
                        </a>
                      </div>
                      <div
                        className="h4 p-1 text-light"
                        style={{ backgroundColor: profile.color }}
                      >
                        {strings['Personal Information']}
                      </div>
                    </div>
                    <p className="text-center">
                      <strong>{strings['Height']}: </strong>
                      {medicalCard.height}
                      <strong className="ml-5">{strings['Weight']}: </strong>
                      {medicalCard.weight}
                    </p>
                    <p>
                      <strong>{strings['Blood Type']}: </strong>
                      {medicalCard.bloodType}
                    </p>
                    <p>
                      <strong>{strings['State of health']}: </strong>
                      {medicalCard.healthCondition}
                    </p>
                    <p>
                      <strong>{strings['Allergies']}: </strong>
                      {medicalCard.allergies}
                    </p>
                    <p>
                      <strong>{strings['Remedies']}: </strong>
                      {medicalCard.remedies}
                    </p>

                    <p>
                      <strong>{strings['Donor']}: </strong>
                      {medicalCard.donor}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Col>
          <Col md={4} />
        </Row>
      </Fragment>
    </Container>
  );
};

export default multilanguage(MedicalCardPage);
