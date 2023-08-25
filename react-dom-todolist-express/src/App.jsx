import "./App.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { HashRouter } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./authContainer/PrivateRoute";
export default function App() {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <PrivateRoute path="/login" component={Login} isLogin={true} />
          {/* <Route path="/login" component={Login} /> */}
          {/* /必须放在最后面 */}
          <Route path="/" component={Index}></Route>
          <Redirect to="/" />
        </Switch>
      </HashRouter>
    </div>
  );
}
