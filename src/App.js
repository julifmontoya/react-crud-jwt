import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PostListProv from "./pages/PostListProv";
import PostDetProv from "./pages/PostDetProv";
import PostList from "./pages/PostList";
import PostDet from "./pages/PostDet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>          
          <NavBar />
          <div className="content-general m-40">
            <div className="max-width">
              <Routes>
                <Route path="/provider/list" element={<PrivateRoute />}>
                  <Route index element={<PostListProv />} />
                </Route>
                <Route path="/provider/posts/" element={<PrivateRoute />}>
                  <Route index element={<PostDetProv />} />
                </Route>
                <Route
                  path="/provider/posts/:postId"
                  element={<PrivateRoute />}
                >
                  <Route index element={<PostDetProv />} />
                </Route>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/:postId" element={<PostDet />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
          <Footer/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
