const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.doctores = require("./doctor.model.js")(sequelize, Sequelize);
db.pacientes = require("./paciente.model.js")(sequelize, Sequelize);

db.doctores.hasMany(db.pacientes, { as: "pacientes", foreignKey: "id_doctor" });
db.pacientes.belongsTo(db.doctores, { foreignKey: "id_doctor", as: "doctor" });

module.exports = db;