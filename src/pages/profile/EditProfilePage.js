import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "components/MainLayout";
import { getUser } from "state/ducks/users/actions";
import Toggle from "components/Toggle";
import LinkedCards from "./components/LinkedCards";
import ProfileForm from "./components/profile/ProfileForm";
import { multilanguage } from "redux-multilanguage";
import Categories from "./components/Categories";

const EditProfilePage = ({ location, history, strings }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const { user, profile } = useSelector((state) => state.users);

  useEffect(() => {
    if (!authUser) {
      history.push("/login");
    } else {
      dispatch(getUser(authUser.username));
    }
  }, [dispatch, history, authUser]);

  function toggleChanged(event) {
    event.preventDefault();
    dispatch(getUser(authUser.username, `?isPersonal=${event.target.value}`));
  }

  return (
    <MainLayout>
      <Row>
        <Col md={12}>
          {user ? (
            <Toggle
              isPersonal={user.isPersonal}
              toggleChanged={toggleChanged}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      {profile && (
        <Row className="mt-2">
          <Col sm={12} lg={5} xl={4}>
            <ProfileForm profile={profile} />
          </Col>
          <Col sm={12} lg={7} xl={8} style={{ paddingTop: "20px" }}>
            <Categories />
          </Col>
          <Col xs={12}>
            <LinkedCards />
          </Col>
        </Row>
      )}
    </MainLayout>
  );
};

export default multilanguage(EditProfilePage);
