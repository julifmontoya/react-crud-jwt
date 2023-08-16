import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Register = () => {
  let { registerUser } = useContext(AuthContext);
  return (
    <div className="flex-center">
      <form onSubmit={registerUser} className="card card--login">
        <h1 className="mb-15 text-center">Register</h1>
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
          pattern=".{6,}"
          title="Ensure this field has at least 6 characters."
          required
        ></input>

        <button className="btn btn--secondary block wd-100p mb-15" type="submit">
          Register
        </button>
        <p className="text-center">
          Already have an account?:{" "}
          <a className="btn--blue" href="/login">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
