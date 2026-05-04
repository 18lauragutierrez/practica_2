module.exports = (sequelize, Sequelize) => {
  return sequelize.define("doctor", {
    id_doctor: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: Sequelize.STRING },
    especialidad: { type: Sequelize.STRING }
  }, { tableName: 'doctores', timestamps: false });
};