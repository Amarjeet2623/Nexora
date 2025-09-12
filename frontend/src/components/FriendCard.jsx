
import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import useAuthUser from "../hooks/useAuthUser";

const FriendCard = ({ friend, onUnfriend }) => {
  console.log("Rendering FriendCard for:", friend);
  const { authUser } = useAuthUser();

  const handleUnfriend = async () => {
    if (onUnfriend) {
      await onUnfriend(friend._id,authUser._id);
    } else {
      console.warn("Unfriend function not provided!");
    }
  };

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-6 text-center mb-3">
          <div className="avatar size-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        {/* ✅ BIO ADDED HERE */}
        {friend.bio && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {friend.bio}
          </p>
        )}

        {/* LANGUAGES */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.language)}
            Native: {friend.language}
          </span>
          {/* {friend.learningLanguage && (
            <span className="badge badge-outline text-xs">
              {getLanguageFlag(friend.learningLanguage)}
              Learning: {friend.learningLanguage}
            </span>
          )} */}
        </div>

        {/* MESSAGE + UNFRIEND BUTTONS */}
        <div className="flex gap-3">
          <Link to={`/chat/${friend._id}`} className="btn btn-outline flex-1">
            Message
          </Link>
          <button
            onClick={handleUnfriend}
            className="btn flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Unfriend
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
