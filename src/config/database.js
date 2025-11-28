import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('>>> Conexión a la base de datos establecida correctamente.');

    // Crear tablas si no existen
    await sequelize.sync({ force: false }); // force:true borra y recrea tablas
    console.log('>>> Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('>>> Error al conectar a la base de datos:', error);
  }
};