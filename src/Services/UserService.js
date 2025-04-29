
class UserService {
    constructor(UserModel) {
      this.UserModel = UserModel;
    }

    async getAllUsers() {
        try {
            //lấy toàn bộ danh sách người dùng
            const users = await this.UserModel.findAll({
                attributes: ['UserName', 'Password', 'Role'],
                include: {
                    model: this.UserModel.sequelize.models.Employee,
                    attributes: ['FullName', 'Email', 'PhoneNumber'],
                },
            });
        } catch (error) {
            throw new Error('Lỗi khi lấy danh sách người dùng: ' + error.message);
        }
    }
}  
export default UserService;