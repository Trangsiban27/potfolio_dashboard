import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./layout/MainLayout";
import Project from "./pages/Project";
import AddProject from "./pages/project/AddProject";
import UpdateProject from "./pages/project/UpdateProject";
import Timeline from "./pages/timeline/Timeline";
import AddTimeline from "./pages/timeline/AddTimeline";

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
        <Route path="/project" element={<Project></Project>}></Route>
        <Route path="/project/add" element={<AddProject></AddProject>}></Route>
        <Route
          path="/project/update/:id"
          element={<UpdateProject></UpdateProject>}
        ></Route>
        <Route path="/timeline" element={<Timeline></Timeline>}></Route>
        <Route
          path="/timeline/add"
          element={<AddTimeline></AddTimeline>}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
