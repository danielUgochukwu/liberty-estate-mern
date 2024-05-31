import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className=" p-8 bg-primary mx-auto mt-14 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none"
            id="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 bg-secondary mt-4 text-white font-semibold rounded-md shadow-sm disabled:opacity-80"
          >
            {loading ? "Loading..." : " Sign Up"}
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red  mt-5">{error}</p>}
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

export default SignUp;
