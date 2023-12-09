const FriendService = require("../services/FriendService");

module.exports = {
  findFriendsByUserId1: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id1 } = req.params;
    if (!user_id1) {
      return res.status(400).json({
        message: "존재하지 않는 유저 아이디입니다.",
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
    req.connection.setTimeout(60 * 15 * 1000);
    const { account } = req.params;
    console.log(account);
    if (!account) {
      return res.status(400).json({
        message: "사용자 계정이 존재하지 않습니다.",
      });
    }
    try {
      const result = await FriendService.findFriendsByAccount(account);
      console.log(result);
      if (!result) {
        return res.status(400).json({
          message: "존재하지 않는 유저입니다.",
        });
      }
      return res.status(200).json(result);
    } catch (err) {
      throw err;
    }
  },
  createFriend: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id1 } = req.params;
    const { user_id2 } = req.body;
    console.log(user_id1, user_id2);
    if (!user_id1) {
      return res.status(400).json({
        message: "존재하지 않는 유저 아이디입니다.",
      });
    }
    if (!user_id2) {
      return res.status(400).json({
        message: "존재하지 않는 유저입니다.",
      });
    }

    try {
      const friend = await FriendService.isValidUserId2(user_id2);
      if (!friend) {
        return res.status(400).json({
          message: "유저 아이디를 입력해주세요.",
        });
      }
      const result = FriendService.createFriend(user_id1, user_id2);
      if (result) {
        return res.status(201).json({
          message: "친구가 추가되었습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  deleteFriend: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id1, user_id2 } = req.params;
    if (!user_id1) {
      return res.status(400).json({
        message: "존재하지 않는 유저 아이디입니다.",
      });
    }
    if (!user_id2) {
      return res.status(400).json({
        message: "존재하지 않는 유저입니다.",
      });
    }
    try {
      const result = FriendService.deleteFriend(user_id1, user_id2);
      if (result) {
        return res.status(200).json({
          message: "친구가 삭제되었습니다.",
        });
      } else {
        return res.status(400).json({
          message: "친구 삭제를 실패하였습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  getFriendTask: async (req, res) => {
    req.connection.setTimeout(60 * 15 * 1000);
    const { user_id1, user_id2 } = req.params;
    if (!user_id1) {
      return res.status(400).json({
        message: "존재하지 않는 유저 아이디입니다.",
      });
    }
    if (!user_id2) {
      return res.status(400).json({
        message: "존재하지 않는 유저입니다.",
      });
    }
    try {
      const friend = await FriendService.findFriendsByUserId1AndUserId2(
        user_id1,
        user_id2
      );
      if (!friend) {
        return res.status(400).json({
          message: "존재하지 않는 친구입니다.",
        });
      }
      const result = await FriendService.getFriendTask(user_id2);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
