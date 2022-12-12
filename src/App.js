import "./App.css";
import Main from "./Components/Main";
import Login from "./Components/Login/Login";
import ChatPage from "./Components/Chat/ChatPage";
import RequestsFromMe from "./Components/Dashboard/Panel/Tabs/RequestsFromMe";
import RequestsToMe from "./Components/Dashboard/Panel/Tabs/RequestsToMe";
import SubmitProperty from "./Components/Dashboard/Panel/Tabs/SubmitProperty";
import UserFormDetail from "./Components/Dashboard/Panel/Tabs/UserFormDetail";
import AllProperties from "./Components/Dashboard/Panel/Tabs/AllProperties";
import MyProperties from "./Components/Dashboard/Panel/Tabs/MyProperties";
import Contracts from "./Components/Dashboard/Panel/Tabs/Contracts";
import SubmitContract from "./Components/Dashboard/Panel/AddOns/SubmitContract";
import AcceptedFromMe from "./Components/Dashboard/Panel/Tabs/AcceptedFromMe";
import AcceptedForMe from "./Components/Dashboard/Panel/Tabs/AcceptedForMe";
import EditProperty from "./Components/Dashboard/Panel/AddOns/EditProperty";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserIsLoggedHandler } from "./redux/reducers/login";
import { useEffect } from "react";
// import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import useToken from "./customHooks/useToken";
import axios from "axios";
import { Redirect, Route, Switch } from "react-router-dom";
import Protected from "./Components/Protect/protected";
import Counter from "./Components/Dashboard/Panel/Tabs/Counter";
import NotFound from "./Components/notFound";
import PropertyDetails from "./Components/Dashboard/Panel/AddOns/PropertyDetails";
// import ProtectedRoute from "./Components/Routs/ProtectedRoute";

function App() {
  const isUserLogged = useSelector((state) => state.login.isUserLogged);
  const [token, setUpdate] = useToken();
  useEffect(() => {
    console.log("isUserLogged redux", isUserLogged);
    // if(!isUserLogged)
  }, [isUserLogged]);
  useEffect(() => {
    const Api_Url = process.env.REACT_APP_API_URL;
    return () => {
      setInterval(() => {
        console.log("interval");
        console.log(token);
        if (!token) return;
        console.log("try new token");
        try {
          axios
            .post(
              `${Api_Url}/account/token/refresh/`,
              {
                refresh: window.localStorage.getItem("REF_TOKEN"),
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(({ data }) => {
              console.log("axios get account/token/refresh/ data.data:", data);
              window.localStorage.setItem("ACC_TOKEN", data.access);
              setUpdate(Math.random());
            })
            .catch((e) => {
              console.log("error in axios account/token/refresh/", e);
            });
        } catch (error) {
          console.log("error", error);
        }
      }, 5000);
    };
  }, []);

  return (
    <div className="bg-warmGray-200">
      {/* {isUserLogged ? <Main /> : <Login />} */}
      <Switch>
        <Route exact path="/auth">
          <Login isLoged={isUserLogged} />
        </Route>
        <Route exact path="/">
          <Main comp={<Counter />} isLoged={isUserLogged} />
        </Route>
        <Route path="/userinfo">
          <Main comp={<UserFormDetail />} isLoged={isUserLogged} />
        </Route>
        <Route path="/chat">
          <Main
            comp={
              <center>
                <ChatPage />
              </center>
            }
            isLoged={isUserLogged}
          />
        </Route>
        <Route path="/contracts">
          <Main path={<Contracts />} isLoged={isUserLogged} />
        </Route>
        <Route path="/submitContract">
          <Main comp={<SubmitContract />} isLoged={isUserLogged} />
        </Route>
        <Route path="/submitProperty">
          <Main comp={<SubmitProperty />} isLoged={isUserLogged} />
        </Route>
        <Route path="/myProperties">
          <Main comp={<MyProperties />} isLoged={isUserLogged} />
        </Route>
        <Route path="/requestsToMe">
          <Main comp={<RequestsToMe />} isLoged={isUserLogged} />
        </Route>
        <Route path="/AcceptedFromMe">
          {/* <center>اجاره داده شده ها</center> */}
          <Main comp={<AcceptedFromMe />} isLoged={isUserLogged} />
        </Route>
        <Route exact path="/allProperties">
          <Main comp={<AllProperties />} isLoged={isUserLogged} />
        </Route>
        <Route exact path="/allProperties/:id">
          <Main comp={<PropertyDetails />} isLoged={isUserLogged} />
        </Route>
        <Route path="/requestsFromMe">
          <Main comp={<RequestsFromMe />} isLoged={isUserLogged} />
        </Route>
        <Route path="/AcceptedForMe">
          <Main comp={<AcceptedForMe />} isLoged={isUserLogged} />
        </Route>
        <Route path="/editProperty">
          <Main comp={<EditProperty />} isLoged={isUserLogged} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {/* <Main /> */}
      {/* <Switch> */}
      {/* <Route exact path="/" component={isUserLogged && Main} /> */}
      {/* <Route exact path="/" component={Login} /> */}
      {/* <Route component={!isUserLogged ? Login : Main} /> */}
      {/* </Switch> */}
      {/* <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/app" component={Main} />
        <Route path="*" component={() => "404 Page Not Found"} />
      </Switch> */}
      <ToastContainer />
    </div>
  );
}

export default App;
