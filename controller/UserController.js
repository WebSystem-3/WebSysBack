const UserService = require("../services/UserService");
module.exports = {
  getUserInfo: async (req, res) => {
    const { user_id } = req.params;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
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
        message: "사용자 계정을 입력해주세요.",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "비밀번호를 입력해주세요.",
      });
    }
    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        message: "비밀번호는 8~16자 사이여야 합니다.",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "이름을 입력해주세요.",
      });
    }

    try {
      const result = await UserService.createUser(account, password, name);
      if (result) {
        return res.status(201).json({
          message: "회원가입 되었습니다.",
        });
      } else {
        return res.status(400).json({
          message: "이미 존재하는 계정입니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  loginRequest: async (req, res) => {
    const { account, password } = req.body;
    if (!account) {
      return res.status(400).json({
        message: "사용자 계정을 입력해주세요.",
      });
    }
    try {
      const result = await UserService.loginUser(account, password);
      if (!result) {
        return res.status(400).json({
          message: "존재하지 않는 아이디이거나 비밀번호가 다릅니다.",
        });
      }
      //세션에 로그인 데이터 저장
      req.session.loginData = {
        account: account,
        name: result[0].name,
      };

      // try {
      await new Promise((resolve, reject) => {
        req.session.save((error) => {
          if (error) {
            console.log("세션 저장 중 오류: ", error);
            reject(error);
          } else {
            resolve();
          }
        });
      });
      // } catch (error) {
      //   return res.status(500).json({
      //     message: "세션 저장 중 오류가 발생했습니다.",
      //   });
      // }

      return res.status(200).json({
        message: "로그인 되었습니다.",
        user_id: result[0].user_id,
      });
    } catch (err) {
      console.error("로그인 오류: ", err);
      return res.status(500).json({
        message: "로그인 중 오류가 발생했습니다",
      });
    }
  },

  updateUser: async (req, res) => {
    const { user_id } = req.params;
    const { password, name } = req.body;
    if (!user_id) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "비밀번호를 입력해주세요.",
      });
    }
    if (password.length < 8 || password.length > 16) {
      return res.status(400).json({
        message: "비밀번호는 8~16자 사이여야 합니다.",
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "이름을 입력해주세요.",
      });
    }
    try {
      const result = await UserService.updateUser(user_id, password, name);
      if (result === 1) {
        return res.status(200).json({
          message: "회원 정보가 수정되었습니다.",
        });
      } else {
        return res.statsu(400).json({
          message: "회원 정보 수정을 실패하였습니다.",
        });
      }
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (req, res) => {
    const { user_id } = req.params;
    if (
      !user_id ||
      user_id === "validation" ||
      user_id === "signup" ||
      user_id === "login"
    ) {
      return res.status(400).json({
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    try {
      const result = await UserService.deleteUser(user_id);
      return res.status(200).json({
        message: "회원 정보가 삭제되었습니다.",
      });
    } catch (err) {
      throw err;
    }
  },
  validationAccount: async (req, res) => {
    const { account } = req.body;
    if (!account) {
      return res.status(400).json({
        message: "사용자 계정을 입력해주세요.",
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
        message: "유저 아이디가 존재하지 않습니다.",
      });
    }
    try {
      const result = UserService.getUserInfo(user_id);

      if (result) {
        //로그아웃 성공 시
        //세션 정보가 존재할 때
        if (req.session.loginData) {
          req.session.destroy((error) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                message: "세션 삭제 중 오류가 발생했습니다.",
              });
            }
            //로그아웃 성공 응답
            return res.status(200).json({
              message: "로그아웃 되었습니다.",
            });
          });
        } else {
          //세션 정보가 없으면 이미 로그아웃된 상태
          return res.status(200).json({
            message: "이미 로그아웃된 상태입니다.",
          });
        }
      } else {
        // 로그아웃 실패시
        return res.status(400).json({
          message: "유저 정보를 찾을 수 없습니다.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "내부 서버 오류.",
      });
    }
  },

  testLogin: async (req, res) => {
    const { account, password } = req.body;

    try {
      // 로그인을 시뮬레이트합니다.
      const result = await UserService.loginUser(account, password);

      // 로그인이 성공했는지 확인합니다.
      if (result) {
        // 세션 데이터 설정
        if (req.session && req.session.loginData) {
          req.session.loginData = {
            user_id: result[0].user_id,
            account: account,
            name: result[0].name,
          };
        }
        // 세션 저장
        req.session.save((error) => {
          if (error) {
            console.log("세션 저장 중 오류: ", error);
            return res.status(500).json({
              message: "세션 저장 중 오류가 발생했습니다.",
              error: error.message,
            });
          }

          return res.status(200).json({
            message: "테스트 로그인 성공. 세션이 설정되었습니다.",
          });
        });
      } else {
        return res.status(400).json({
          message: "테스트 로그인 실패. 유효하지 않은 자격 증명입니다.",
        });
      }
    } catch (err) {
      console.error("내부 서버 오류: ", err);
      return res.status(500).json({
        message: "내부 서버 오류.",
        error: err.message,
      });
    }
  },
};
