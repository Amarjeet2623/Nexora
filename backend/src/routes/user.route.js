import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  sendFriendRequest,
  putUser,
  unFriend,
  declineFriendRequest,
  deleteUser,
  // checkIfFriends,
  // getUserById
} from "../controllers/user.controller.js";

const router = express.Router();

// apply auth middleware to all routes
router.use(protectRoute);

router.put("/edit", putUser);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

// router.get("/check-friends/:userId", checkIfFriends);
// router.get("/:userId", getUserById);

router.delete("/delete/:id", deleteUser);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.put("/friend-request/:id/decline", declineFriendRequest);
router.put("/friend/:userId/delete/:requestId", unFriend);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;
