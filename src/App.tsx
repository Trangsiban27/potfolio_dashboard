import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./layout/MainLayout";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUser());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route
        path="/password/forgot"
        element={<ForgotPassword></ForgotPassword>}
      ></Route>
      <Route
        path="/password/reset/:token"
        element={<ResetPassword></ResetPassword>}
      ></Route>
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<HomePage></HomePage>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
