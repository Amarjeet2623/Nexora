import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { putUser, deleteUser, } from "../lib/api";

export default function UserPage() {
  const { authUser, logout } = useAuthUser();
  const navigate = useNavigate();
  const [editting, setEditing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    profilePic: authUser?.profilePic || "",
    email: authUser?.email || "",
    language: authUser?.language || "",
    bio: authUser?.bio || "",
    location: authUser?.location || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function updateUserProfile(data) {
    try {
      const response = await putUser(data);
      if (!response.ok) {
        throw new Error("Failed to update profile");
      } else {
        const updatedUser = await response.json();
        console.log("Profile updated:", updatedUser);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }


// // Fetch target user data if viewing someone else's profile
//   const { data: targetUser, isLoading: loadingUser } = useQuery({
//     queryKey: ["user", userId],
//     queryFn: () => getUserById(userId),
//     enabled: !isOwnUser && !!userId,
//   });
  
//   // Check friendship status if viewing someone else's profile
//   const { data: friendshipStatus } = useQuery({
//     queryKey: ["checkFriends", userId],
//     queryFn: () => checkIfFriends(userId),
//     enabled: !isOwnUser && !!userId,
//   });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Saving profile:", formData);
      await updateUserProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      const userId = authUser?._id;
      if (!userId) throw new Error("User ID not found.");

      await deleteUser(userId);
      alert("Your account has been deleted.");

      if (typeof logout === "function") await logout();
      navigate("/");
    } catch (err) {
      console.error("Delete account failed:", err);
      setDeleteError(err.message || "Failed to delete account");
      alert("Failed to delete account: " + (err.message || "Unknown error"));
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      {!editting ? (
        <div className="max-w-3xl mx-auto p-6 h-screen">
          <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
            <img
              src={formData.profilePic || "/default-avatar.png"}
              alt={formData.fullName}
              className="w-28 h-28 mx-auto rounded-full object-cover border"
            />
            <h2 className="text-2xl font-semibold mt-4">{formData.fullName}</h2>
            <p className="text-gray-600">{formData.email}</p>
            {formData.location && (
              <p className="text-sm text-gray-500 mt-1">
                📍 {formData.location}
              </p>
            )}

            <button
              onClick={() => setEditing(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>

          {formData.bio && (
            <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-base-300">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-700 mt-2">{formData.bio}</p>
            </div>
          )}

          {formData.language && (
            <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-base-300">
              <h3 className="text-lg font-semibold">Language</h3>
              <p className="text-gray-700 mt-2">{formData.language}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6">
          <form onSubmit={handleSubmit}>
            <h1 className="text-5xl font-bold text-center text-primary mb-4">
              Edit Profile
            </h1>

            <div className="bg-base-200 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 text-center border border-base-300">
              {/* ✅ Profile Picture Preview */}
              <img
                src={formData.profilePic || "/default-avatar.png"}
                alt="Profile Avatar"
                className="w-28 h-28 mx-auto rounded-full object-cover border mb-4"
              />

              {/* ✅ Generate Random Avatar Button */}
              <button
                type="button"
                onClick={() => {
                  const randomSeed = Math.floor(Math.random() * 10000);
                  const newAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
                  setFormData((prev) => ({ ...prev, profilePic: newAvatarUrl }));
                }}
                className="mb-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                🔄 Generate Random Avatar
              </button>

              {/* Profile Picture URL Input */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  name="profilePic"
                  value={formData.profilePic}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter image URL"
                />
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Location 📍
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Language Dropdown */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select a language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Russian">Russian</option>
                  <option value="Portuguese">Portuguese</option>
                </select>
              </div>

              {/* Bio */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border rounded-lg"
                ></textarea>
              </div>

              {/* Password Change */}
              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="text-xl font-bold text-center text-primary mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Confirm new password"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>

              {/* Delete Account */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deleteLoading ? "Deleting..." : "Delete Account"}
                </button>
                {deleteError && (
                  <p className="text-red-500 text-sm mt-2">{deleteError}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
