import "./firebase/firebase";
import Home from "./pages/home-component";
import BookAppointment from "./pages/book_appointment";
import LoginScreen from "./pages/login";
import { Switch, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/signup";
import signout from "./pages/signout";
import Admin from "./pages/admin";

function App() {
  // const ProtectedRoute =
  return (
    <AuthProvider>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LoginScreen} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={signout} />
        <Route path="/book" component={BookAppointment} />

        <Route path="/admin" component={Admin} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
