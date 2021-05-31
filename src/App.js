import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import SignUp from "./pages/auth/register/Register";
import Chat from "./pages/main/Chat/Chat";
import Counter from "./pages/main/Counter/CounterFunctional";

import haveLogIn from "./pages/auth/haveLogIn/haveLogIn";

function App() {
  return (
    <Provider store={store}>
      <PersistGate Loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <PublicRoute
              restricted={true}
              path="/login"
              exact
              component={Login}
            />
            <PublicRoute
              restricted={true}
              path="/register"
              exact
              component={SignUp}
            />
            <PublicRoute
              restricted={true}
              path="/havelogin"
              exact
              component={haveLogIn}
            />
            <PrivateRoute path="/chat" exact component={Chat} />
            {/* <PrivateRoute path="/counter" exact component={Counter} /> */}
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
