import Firebase from "firebase";
import { BrowserRouter as Router } from "react-router-dom";
import { firebaseConfig } from "../firebase";
import Store from "../redux/store";
import App from "./app";

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
