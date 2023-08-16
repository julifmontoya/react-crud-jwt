import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div className="flex-center">
      <div className="card card--login">
        <form onSubmit={loginUser}>
          <h1 className="mb-15 text-center">Login</h1>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          ></input>

          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter Password"
            required
          ></input>
          <button
            className="btn btn--secondary block wd-100p mb-15"
            type="submit"
          >
            Login
          </button>
          <p className="text-center">
            Already have an account?:{" "}
            <a className="btn--blue" href="/register">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
