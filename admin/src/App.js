import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Posts from "./Pages/Posts/Posts";
import Users from "./Pages/Users/Users";
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";
import PostsReports from "./Pages/PostsReport/PostsReports";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const user = useSelector((state) => state.authReducer.authData);

  const location = useLocation();
  const shouldApplyClassName = location.pathname !== "/";

  // Array of route paths where the sidebar should not be displayed
  const routesWithoutSidebar = ["/"];

  // Check if the current route is in the array of routes without sidebar
  const showSidebar = !routesWithoutSidebar.includes(location.pathname);

  return (
    <div className={shouldApplyClassName ? "AppGlass" : ""}>
      {showSidebar && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="dashboard" /> : <Auth />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="../" />}
        />
        <Route
          path="/posts"
          element={user ? <Posts /> : <Navigate to="../" />}
        />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate to="../" />}
        />
        <Route
          path="/postsReport"
          element={user ? <PostsReports /> : <Navigate to="../" />}
        />
      </Routes>
    </div>
  );
}

export default App;
