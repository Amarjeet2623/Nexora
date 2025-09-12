import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const putUser = async (formdata) => {
  console.log("API formdata:", formdata);
  try {
    console.log("Sending PUT request to /users/edit with data:", formdata);
    const res = await axiosInstance.put("/users/edit", formdata);
    console.log("API response:", res);
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}



export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return response.data;
}
export async function deleteFriendRequest(requestId) {
  const response = await axiosInstance.put(
    `/users/friend-request/${requestId}/decline`
  );
  return response.data;
}

export async function UnFriend(requestId,userId) {
  const response = await axiosInstance.put(
    `/users/friend/${userId}/delete/${requestId}`
  );
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

// ✅ NEW: Delete User Account
export async function deleteUser(userId) {
  try {
    console.log("Sending DELETE request to /users/delete with ID:", userId);
    const res = await axiosInstance.delete(`/users/delete/${userId}`);
    console.log("Delete response:", res);
    return res.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete account");
  }
}


// export async function checkIfFriends(userId) {
//   const response = await axiosInstance.get(`/users/check-friends/${userId}`);
//   return response.data;
// }

// export async function getUserById(userId) {
//   const response = await axiosInstance.get(`/users/${userId}`);
//   return response.data;
// }