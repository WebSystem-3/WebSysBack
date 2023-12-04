const FriendService = require("../services/FriendService");

module.exports = {
  findFriendsByUserId1: async (req, res) => {
    const { user_id1 } = req.params;
    if (!user_id1) {
      return res.status(400).json({
        message: "user_id1이 존재하지 않습니다.",
      });
    }
    try {
      const result = await FriendService.findFriendsByUserId1(user_id1);
      return res.status(200).json(result);
    } catch (err) {
      throw err;
    }
  },
  findFriendsByAccount: async (req, res) => {
    const { account } = req.body;
    if (!account) {
      return res.status(400).json({
        message: "account가 존재하지 않습니다.",
      });
    }
    try {
      const result = await FriendService.findFriendsByAccount(account);
      if (!result) {
        return res.status(400).json({
          message: "해당 유저가 존재하지 않습니다.",
        });
      }
      return res.status(200).json(result);
    } catch (err) {
      throw err;
    }
  },
  createFriend: async (req, res) => {
    const { user_id1, user_id2 } = req.params;
    if (!user_id1) {
      return res.status(400).json({
        message: "user_id1이 존재하지 않습니다.",
      });
    }
    if (!user_id2) {
      return res.status(400).json({
        message: "user_id2가 존재하지 않습니다.",
      });
    }
    try {
      const result = FriendService.createFriend(user_id1, user_id2);
      if (result) {
        return res.status(201).json({
          message: "친구 추가를 성공하였습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  deleteFriend: async (req, res) => {
    const { user_id1, user_id2 } = req.params;
    if (!user_id1) {
      return res.status(400).json({
        message: "user_id1이 존재하지 않습니다.",
      });
    }
    if (!user_id2) {
      return res.status(400).json({
        message: "user_id2가 존재하지 않습니다.",
      });
    }
    try {
      const result = FriendService.deleteFriend(user_id1, user_id2);
      if (result) {
        return res.status(200).json({
          message: "친구 삭제를 성공하였습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  getFriendTask: async (req, res) => {},
};
