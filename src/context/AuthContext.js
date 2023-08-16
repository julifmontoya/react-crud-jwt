import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants/global";
import axios from "axios";
const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/affiliate/login/`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/provider/list");
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log("Something went wrong!", error);
      alert(error.response.data["detail"]);
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  let updateToken = async () => {
    try {
      const response = await axios.post(
        `${URL}/refresh/`,
        {
          refresh: authTokens?.refresh,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
      } else {
        logoutUser();
      }

      if (loading) {
        setLoading(false);
      }
    } catch (error) {
      console.log("Something went wrong!", error);
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/affiliate/provider/signup/`, {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (response.status === 201) {
        const data = response.data;
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/provider/list");
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data["error"]);
    }
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let minutes = 1000 * 60 * 60;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, minutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
