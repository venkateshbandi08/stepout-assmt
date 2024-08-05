import { Sequelize } from 'sequelize'; 


const sequelize = new Sequelize('stepout', 'root', 'Ramana@21', {
  host: 'localhost', 
  dialect: 'mysql', 
});

export default sequelize; 