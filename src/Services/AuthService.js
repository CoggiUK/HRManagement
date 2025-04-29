import bcrypt from 'bcrypt';

class AuthService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async register(userData) {
    const { UserName, Password, Role } = userData;

    // Kiểm tra nếu UserName đã tồn tại
    const existingUser = await this.UserModel.findOne({ where: { UserName } });
    if (existingUser) {
      throw new Error('Tên người dùng đã tồn tại');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Tạo user mới
    const newUser = await this.UserModel.create({
      UserName,
      Password: hashedPassword,
      Role,
    });

    return newUser;
  }

  async login(credentials) {
    const { UserName, Password } = credentials;

    // Tìm user theo UserName
    const user = await this.UserModel.findOne({ where: { UserName } });
    if (!user) {
      throw new Error('Tên người dùng hoặc mật khẩu không đúng');
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      throw new Error('Tên người dùng hoặc mật khẩu không đúng');
    }

    return user; // Chỉ trả về thông tin người dùng nếu đăng nhập thành công
  }
}

export default AuthService;
