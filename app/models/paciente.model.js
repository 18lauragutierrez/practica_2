module.exports = (sequelize, Sequelize) => {
  return sequelize.define("paciente", {
    id_paciente: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING },
    edad: { type: Sequelize.INTEGER },
    foto: { type: Sequelize.STRING }
  }, { tableName: 'pacientes', timestamps: false });
};