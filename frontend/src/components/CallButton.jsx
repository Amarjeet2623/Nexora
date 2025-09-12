import { Phone, Video } from "lucide-react";

const CallButton = ({ handleVideoCall, handleVoiceCall }) => {
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {/* Voice Call */}
      <button
        onClick={handleVoiceCall}
        className="p-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
      >
        <Phone size={20} />
      </button>

      {/* Video Call */}
      <button
        onClick={handleVideoCall}
        className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
      >
        <Video size={20} />
      </button>
    </div>
  );
};

export default CallButton;
