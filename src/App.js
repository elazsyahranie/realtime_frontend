import { BrowserRouter as Router, Switch } from "react-router-dom";

import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import io from "socket.io-client";

import Login from "./pages/auth/Login/Login";
import SignUp from "./pages/auth/register/Register";
import Chat from "./pages/main/Chat/Chat";
// import Counter from "./pages/main/Counter/CounterFunctional";

function App() {
  const [socket, setSocket] = useState(null); // harus pakai kurung siku [array], bukan kurung kurawal {object}
  const setUpSocket = () => {
    const newSocket = io.connect("http://localhost:3003", {
      path: "/backend3/socket.io",
    });
    newSocket.on("connect", () => {
      console.log("Connected Socket Client !");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setUpSocket();
  }, []);

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
            {/* socket={socket} di lempar dari kdodingan di atas return() */}
            <PrivateRoute socket={socket} path="/chat" exact component={Chat} />
            {/* <PrivateRoute path="/counter" exact component={Counter} /> */}
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
