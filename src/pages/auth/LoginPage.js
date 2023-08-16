import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import FormContainer from "components/FormContainer";
import { multilanguage } from "redux-multilanguage";
import LoginPageForm from "./components/LoginPageForm";

const LoginPage = ({ location, history, strings }) => {
  const { user: authUser } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authUser) {
      history.push(redirect);
    }
  }, [history, authUser, redirect]);

  return (
    <FormContainer>
      <h1>{strings["Sign In"]}</h1>

      <LoginPageForm strings={strings} />
    </FormContainer>
  );
};
export default multilanguage(LoginPage);
