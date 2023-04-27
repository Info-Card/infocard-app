import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect, useDispatch } from "react-redux";
import routes from "./config/routesConfig";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const { rehydrated } = useSelector((state) => state._persist);
  useEffect(() => {
    dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/en.json"),
          es: require("./translations/es.json"),
        },
      })
    );
  });

  return (
    <Router>
      {rehydrated && (
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Switch>
      )}
    </Router>
  );
};

export default connect()(multilanguage(App));
