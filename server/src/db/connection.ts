import { Sequelize} from 'sequelize';

const sequelize = new Sequelize('almacen', 'root', 'nikefootball888', {
    host: 'localhost',
    dialect: 'mysql'
  });

  export default sequelize;