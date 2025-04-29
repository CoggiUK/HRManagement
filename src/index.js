import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Department from './Models/Department.js';
import Position from './Models/Position.js';
import Employee from './Models/Employee.js';
import User from './Models/User.js';
import Shift from './Models/Shift.js';
import WorkSchedule from './Models/WorkSchedule.js';
import RequestType from './Models/RequestType.js';
import Request from './Models/Request.js';

dotenv.config();

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình Sequelize
const sequelize = new Sequelize({
  dialect: 'mssql',
  host: process.env.DB_SERVER || 'COGGIUK\\SQLEXPRESS',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true,
      enableArithAbort: true,
      connectTimeout: 30000
    }
  }
});

// Khởi tạo models
const initializeModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    // Khởi tạo models
    Department.initModel(sequelize);
    Position.initModel(sequelize);
    Employee.initModel(sequelize);
    User.initModel(sequelize);
    Shift.initModel(sequelize);
    WorkSchedule.initModel(sequelize);
    RequestType.initModel(sequelize);
    Request.initModel(sequelize);

    // Thiết lập các mối quan hệ
    Department.hasMany(Employee, { foreignKey: 'DepartmentId' });
    Employee.belongsTo(Department, { foreignKey: 'DepartmentId' });

    Position.hasMany(Employee, { foreignKey: 'PositionId' });
    Employee.belongsTo(Position, { foreignKey: 'PositionId' });

    Employee.hasOne(User, { foreignKey: 'EmployeeId' });
    User.belongsTo(Employee, { foreignKey: 'EmployeeId' });

    Employee.hasMany(WorkSchedule, { foreignKey: 'EmployeeId' });
    WorkSchedule.belongsTo(Employee, { foreignKey: 'EmployeeId' });

    Shift.hasMany(WorkSchedule, { foreignKey: 'ShiftId' });
    WorkSchedule.belongsTo(Shift, { foreignKey: 'ShiftId' });

    Employee.hasMany(Request, { foreignKey: 'EmployeeId' });
    Request.belongsTo(Employee, { foreignKey: 'EmployeeId' });

    RequestType.hasMany(Request, { foreignKey: 'RequestTypeId' });
    Request.belongsTo(RequestType, { foreignKey: 'RequestTypeId' });

    // Sync với alter:false để cập nhật schema mà không xóa dữ liệu
    await sequelize.sync({ alter: false });
    console.log('Models synchronized.');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

// Middleware thêm models vào request object
router.use((req, res, next) => {
  req.models = { sequelize, Department, Position, Employee, User, Shift, WorkSchedule, RequestType, Request };
  next();
});

// Fix ESM URL scheme error for loading routes
const loadRoutes = async () => {
  const routesPath = path.join(__dirname, 'Routes');
  
  if (!fs.existsSync(routesPath)) {
    fs.mkdirSync(routesPath, { recursive: true });
    return;
  }

  const routeFiles = fs.readdirSync(routesPath).filter(file => file.endsWith('Routes.js'));

  for (const file of routeFiles) {
    try {
      const routePath = path.join(routesPath, file);
      const routeModule = await import(`file://${routePath}`);
      const routeName = '/' + file.replace('Routes.js', '').toLowerCase();
      console.log(` Loaded route: ${routeName} from ${file}`);
      router.use(routeName, routeModule.default);
    } catch (error) {
      console.error(` Error loading route ${file}:`, error);
    }
  }
};


// Initialize models and routes
const initialize = async () => {
  try {
    await initializeModels();
    await loadRoutes();
  } catch (error) {
    console.error('Initialization failed:', error);
    process.exit(1);
  }
};

initialize();

export default router;
