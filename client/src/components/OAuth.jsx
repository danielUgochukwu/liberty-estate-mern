import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      console.log(`couldn't sign in: ${error}`);
    }
  };
  return (
    <button
      type="button"
      className="w-full flex items-center justify-center py-2 px-4 bg-red-600 text-night border border-secondary font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
      onClick={handleGoogleClick}
    >
      <FcGoogle className="text-xl mr-3" />
      Continue with Google
    </button>
  );
};

export default OAuth;
