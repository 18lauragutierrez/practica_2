module.exports = app => {
  const pacientes = require("../controllers/paciente.controller.js");
  const upload = require("../middlewares/upload");
  var router = require("express").Router();

 router.post("/update", upload.single("foto"), pacientes.update);
 router.post("/", upload.single("foto"), pacientes.create);
  router.get("/", pacientes.findAll);

  app.use('/api/pacientes', router);
};