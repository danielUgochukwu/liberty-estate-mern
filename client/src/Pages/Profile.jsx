import { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaList,
  FaHeart,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [editedProfileImage, setEditedProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfileImage(editedProfileImage);
    setEditProfile(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {!editProfile || !isMobile ? (
        <div className="w-full md:w-1/4 bg-primary p-4 shadow-md h-full">
          <div className="flex flex-col items-center">
            <img
              src={profileImage || currentUser.avatar}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold mb-4">
              {currentUser.username}
            </h2>
            <div className="flex flex-col mt-4 space-y-8">
              <button
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                onClick={() => setEditProfile(!editProfile)}
              >
                <FaEdit /> <span>Edit Profile</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <FaList /> <span>Listing</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-[#f72585]">
                <FaHeart /> <span>Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red">
                <FaSignOutAlt /> <span>Log Out</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red">
                <FaTrashAlt /> <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`w-full ${
          !editProfile || !isMobile ? "md:w-3/4" : "h-fill"
        } p-4 md:p-8 flex-center`}
      >
        {editProfile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary lg:w-3/5 px-8 py-10 md:p-6 rounded-lg shadow-md h-fill"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Edit Profile
            </h2>
            <div className="flex flex-col items-center mb-4">
              <div className="relative">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <img
                    src={editedProfileImage || currentUser.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full mb-2"
                    onClick={handleClick}
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </div>
            </div>
            <form className="space-y-4" onSubmit={handleSaveChanges}>
              <div>
                <input
                  placeholder="Username"
                  id="username"
                  type="text"
                  className="w-full mt-1 p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                />
              </div>
              <div>
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  className="w-full mt-1 p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                />
              </div>
              <div>
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  className="w-full mt-1 p-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-4 p-2 bg-secondary text-night rounded-md hover:opacity-95 disabled:opacity-80"
              >
                Save Changes
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
