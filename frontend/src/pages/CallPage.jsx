import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = ({ type = "video" }) => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [permissionError, setPermissionError] = useState(null);

  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData, isLoading: tokenLoading } = useQuery({
    queryKey: ["streamToken", authUser?._id, callId],
    queryFn: () => getStreamToken(authUser._id, callId),
    enabled: !!authUser && !!callId,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        // Check microphone permission
        const micPermission = await navigator.permissions.query({ name: "microphone" });
        if (micPermission.state === "denied") {
          setPermissionError(
            "Microphone access is blocked. Please enable it in your browser settings and reload the page."
          );
          setIsConnecting(false);
          return;
        }

        // Check camera permission only for video calls
        if (type === "video") {
          const camPermission = await navigator.permissions.query({ name: "camera" });
          if (camPermission.state === "denied") {
            setPermissionError(
              "Camera access is blocked. Please enable it in your browser settings and reload the page."
            );
            setIsConnecting(false);
            return;
          }
        }

        // Initialize Stream client
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const videoClient = StreamVideoClient.getOrCreateInstance({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callType = type === "voice" ? "audio_room" : "default";
        const callInstance = videoClient.call(callType, callId);

        // Join call, creating if needed
        await callInstance.join({ create: true });

        // Enable microphone if permissions allow
        if (micPermission.state === "granted" || micPermission.state === "prompt") {
          await callInstance.microphone.enable();
        }

        // For video calls, enable camera if allowed, else disable
        if (type === "video") {
          const camPermission = await navigator.permissions.query({ name: "camera" });
          if (camPermission.state === "granted" || camPermission.state === "prompt") {
            await callInstance.camera.enable();
          }
        } else {
          await callInstance.camera.disable();
        }

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("❌ Error joining call:", error);
        toast.error("Could not join the call. Please check device permissions.");
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId, type]);

  if (isLoading || tokenLoading || isConnecting) return <PageLoader />;

  if (permissionError) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-6 rounded-2xl max-w-md text-center shadow-lg">
          <p className="mb-4 font-semibold">{permissionError}</p>
          <p className="text-sm text-gray-600">
            In Chrome: Click the 🔒 icon → Site settings → Allow Microphone/Camera → Reload.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent type={type} />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-gray-600">
              Could not initialize call. Please refresh or try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = ({ type }) => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      {type === "voice" ? (
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-wrap items-center justify-center gap-4 overflow-y-auto p-6">
            {participants.map((p) => (
              <div
                key={p.userId}
                className="p-4 rounded-lg bg-gray-200 dark:bg-gray-800 w-48 text-center shadow"
              >
                <img
                  src={p.image || "/default-avatar.png"}
                  alt={p.name || p.userId}
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                />
                <p className="font-medium">{p.name || p.userId}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">🎤 Connected</p>
              </div>
            ))}
          </div>
          <CallControls micButton cameraButton={false} onLeave={() => navigate("/")} />
        </div>
      ) : (
        <>
          <SpeakerLayout />
          <CallControls onLeave={() => navigate("/")} />
        </>
      )}
    </StreamTheme>
  );
};

// Export separate VoiceCallPage
export const VoiceCallPage = () => <CallPage type="voice" />;
export default CallPage;
