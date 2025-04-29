import AuthService from '../Services/AuthService.js';
import User from '../Models/User.js';

const AuthController = {
    async register(req, res) {
        const authService = new AuthService(User);
        
        try {
            const newUser = await authService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'Đăng ký thành công',
                data: newUser
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async login(req, res) {
        const authService = new AuthService(User);
        
        try {
            const user = await authService.login(req.body);
            res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                data: user
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

export default AuthController;
