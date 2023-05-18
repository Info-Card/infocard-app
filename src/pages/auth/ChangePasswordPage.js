import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import * as types from "state/ducks/users/types";
import MainLayout from "components/MainLayout";
import { multilanguage } from "redux-multilanguage";
import ChangePasswordForm from "./components/ChangePasswordForm";

const ChangePasswordPage = ({ location, history, strings }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const { success, error, loading } = useSelector((state) => state.users);
  const { rehydrated } = useSelector((state) => state._persist);
  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push("/login");
      } else if (success) {
        dispatch({ type: types.USER_RESET });
        history.push("/");
      }
    }
  }, [history, success, dispatch, authUser, rehydrated]);
  return (
    <MainLayout>
      <Fragment>
        <FormContainer>
          <h3>{strings["Change Password"]}</h3>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <ChangePasswordForm strings={strings} />
        </FormContainer>
      </Fragment>
    </MainLayout>
  );
};

export default multilanguage(ChangePasswordPage);
