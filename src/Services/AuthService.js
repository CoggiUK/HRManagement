import bcrypt from 'bcrypt';

class AuthService {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async register(userData) {
        try {
            const { UserName, Password, Role } = userData;

            // Kiểm tra user tồn tại
            const existingUser = await this.UserModel.findOne({ 
                where: { 
                    UserName: UserName,
                    DeletedAt: null
                },
                attributes: ['UserId', 'UserName']
            });

            if (existingUser) {
                throw new Error('Tên người dùng đã tồn tại');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(Password, 10);

            // Tạo user mới - chỉ tạo trong bảng Users
            const newUser = await this.UserModel.create({
                UserName,
                Password: hashedPassword,
                Role
            }, {
                // Chỉ lấy các trường cần thiết
                fields: ['UserName', 'Password', 'Role']
            });

            // Trả về thông tin user không bao gồm password
            return {
                UserId: newUser.UserId,
                UserName: newUser.UserName,
                Role: newUser.Role,
                CreatedAt: newUser.CreatedAt
            };

        } catch (error) {
            console.error('Registration error:', error);
            throw new Error(`Đăng ký thất bại: ${error.message}`);
        }
    }

    async login(credentials) {
        try {
            const { UserName, Password } = credentials;

            // Find user
            const user = await this.UserModel.findOne({ 
                where: { 
                    UserName,
                    DeletedAt: null
                },
                attributes: ['UserId', 'UserName', 'Password', 'Role']
            });

            if (!user) {
                throw new Error('Tên người dùng hoặc mật khẩu không đúng');
            }

            // Compare password
            const isValidPassword = await bcrypt.compare(Password, user.Password);
            if (!isValidPassword) {
                throw new Error('Tên người dùng hoặc mật khẩu không đúng');
            }

            // Return without password
            const { Password: _, ...userWithoutPassword } = user.toJSON();
            return userWithoutPassword;

        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }
}

export default AuthService;
