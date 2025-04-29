class UserService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async getAllUsers() {
        try {
            return await this.UserModel.findAll({
                attributes: ['UserId', 'UserName', 'Role'], // Chỉ lấy các trường cần thiết
                where: {
                    DeletedAt: null
                }
            });
        } catch (error) {
            throw new Error(`Failed to get users: ${error.message}`);
        }
    }
}

export default UserService;