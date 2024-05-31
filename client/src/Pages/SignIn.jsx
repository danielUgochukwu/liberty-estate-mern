import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.emailOrUsername || !formData.password) {
      dispatch(signInFailure("Both fields are required"));
      return;
    }

    try {
      const signInData = formData.emailOrUsername.includes("@")
        ? { email: formData.emailOrUsername, password: formData.password }
        : { username: formData.emailOrUsername, password: formData.password };

      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const data = await res.json();
      if (res.status !== 200) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-8 bg-primary mx-auto mt-14 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="emailOrUsername"
            placeholder="Email or Username"
            onChange={handleChange}
            value={formData.emailOrUsername}
          />
        </div>
        <div>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        {error && <p className="text-red mt-2">{error}</p>}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 bg-secondary mt-4 text-white font-semibold rounded-md shadow-sm disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-2">
        <p>{"Don't have an account?"}</p>
        <Link to="/sign-up">
          <span className="text-blue">Sign Up</span>
        </Link>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="border-t flex-grow mr-3"></span>
        <span className="text-gray-500">or</span>
        <span className="border-t flex-grow ml-3"></span>
      </div>
      <div className="mt-6">
        <OAuth />
      </div>
    </div>
  );
};

export default SignIn;
