import UserService from '../Services/UserService.js';
import User from '../Models/User.js';

const UserController = {
    async getAllUsers(req, res) {
        const userService = new UserService(User);
    
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ 
                success: false,
                message: error.message 
            });
        }
    }
};

export default UserController;
