import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className=" p-8 bg-primary mx-auto mt-16 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
      <form className="space-y-4">
        <div>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="email"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Password"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 bg-secondary mt-4 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex gap-2 mt-2">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue">Sign In</span>
        </Link>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="border-t flex-grow mr-3"></span>
        <span className="text-gray-500">or</span>
        <span className="border-t flex-grow ml-3"></span>
      </div>
      <div className="mt-6">
        <button
          type="button"
          className="w-full flex items-center justify-center py-2 px-4 bg-red-600 text-night border border-secondary font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FcGoogle className="text-xl mr-3" />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
