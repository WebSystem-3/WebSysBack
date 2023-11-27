const UserService = require("../services/UserService");

module.exports = {
  getUserInfo: async (req, res) => {
    const { user_id } = req.params;
    try {
      const result = await UserService.getUserInfo(user_id);
      return res.json(result[0]);
    } catch (err) {
      throw err;
    }
  },
  createUser: async (req, res) => {
    try {
      const { account, password, name } = req.body;
      const result = await UserService.createUser(account, password, name);
      return res.status(201).json({
        message: "회원 가입을 성공하였습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  loginRequest: async (req, res) => {
    try {
      const { account, password } = req.body;
      const result = await UserService.loginUser(account, password);
      if (result) {
        res.status(200).json({
          message: "로그인을 성공하였습니다.",
        });
      } else {
        return res.status(400).json({
          message: "비밀번호가 다릅니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (req, res) => {
    try {
      const { password, name } = req.body;
      const result = await UserService.updateUser(password, name);
      return res.status(200).json({
        message: "회원 정보 수정을 완료하였습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const result = await UserService.deleteUser(user_id);
      return res.status(200).json({
        message: "회원 정보 삭제를 완료하였습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
};
