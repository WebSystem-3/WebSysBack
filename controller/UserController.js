const UserService = require("../services/UserService");

module.exports = {
  getUserInfo: async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    try {
      const result = await UserService.getUserInfo(user_id);
      return res.json(result[0][0]);
    } catch (err) {
      throw err;
    }
  },
  createUser: async (req, res) => {
    const { account, password, name } = req.body;
    if (!account) {
      return res.status(400).json({
        message: "account를 입력해주세요.",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password를 입력해주세요.",
      });
    }
    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        message: "password는 8~16자 사이여야 합니다.",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "name을 입력해주세요.",
      });
    }

    try {
      const result = await UserService.createUser(account, password, name);
      return res.status(201).json({
        message: "회원 가입을 성공하였습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  loginRequest: async (req, res) => {
    const { account, password } = req.body;
    if (!account) {
      return res.status(400).json({
        message: "account를 입력해주세요.",
      });
    }
    try {
      const result = await UserService.loginUser(account, password);
      if (!result) {
        return res.status(400).json({
          message: "존재하지 않는 id 이거나 비밀번호가 다릅니다.",
        });
      }
      return res.status(200).json({
        message: "로그인을 성공하였습니다.",
        user_id: result,
      });
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (req, res) => {
    const { user_id } = req.params;
    const { password, name } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password를 입력해주세요.",
      });
    }
    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        message: "password는 8~16자 사이여야 합니다.",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "name을 입력해주세요.",
      });
    }
    try {
      const result = await UserService.updateUser(user_id, password, name);
      return res.status(200).json({
        message: "회원 정보 수정을 완료하였습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    try {
      const result = await UserService.deleteUser(user_id);
      return res.status(200).json({
        message: "회원 정보 삭제를 완료하였습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  validationAccount: async (req, res) => {
    const { account } = req.body;
    if (!account) {
      return res.status(400).json({
        message: "account를 입력해주세요.",
      });
    }
    try {
      const result = await UserService.validationAccount(account);
      if (result) {
        return res.status(200).json({
          message: "사용 가능한 아이디입니다.",
        });
      } else {
        return res.status(400).json({
          message: "이미 사용중인 아이디입니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  logoutUser: async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "user_id가 존재하지 않습니다.",
      });
    }
    try {
      const result = UserService.getUserInfo(user_id);
      if (result) {
        //로그아웃 성공 시
      } else {
        // 로그아웃 실패시
      }
    } catch (err) {
      throw err;
    }
  },
};
