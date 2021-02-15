import Firebase from "firebase";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { firebaseConfig } from "../firebase/index";
import Store from "../redux/store";
import App from "./app";
import Appbar from "./appbar";
import Test from "./test";
import AdminTable from "./admin/AdminTable";
import AdminPanel from "./admin";

Firebase.initializeApp(firebaseConfig);

const store = Store();
function Root() {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}

export default Root;
