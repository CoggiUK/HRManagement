import AuthService from '../Services/AuthService.js';

const AuthController = {
  async register(req, res) {
    const { User } = req.models;
    const authService = new AuthService(User);

    try {
      const newUser = await authService.register(req.body);
      res.status(201).json({ message: 'Đăng ký thành công', user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    const { User } = req.models;
    const authService = new AuthService(User);

    try {
      const user = await authService.login(req.body);
      res.status(200).json({
        message: 'Đăng nhập thành công',
        user: {
          UserId: user.UserId,
          UserName: user.UserName,
          Role: user.Role,
        },
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

export default AuthController;
