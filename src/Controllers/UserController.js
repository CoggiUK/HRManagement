import UserService from '../Services/UserService.js';

const UserController = {
    async getAllUsers(req, res) {
        const { User } = req.models;
        const userService = new UserService(User);
    
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default UserController;
