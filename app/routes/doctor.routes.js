module.exports = app => {
    const doctores = require("../controllers/doctor.controller.js");
    var router = require("express").Router();

    router.post("/", doctores.create);
    router.get("/", doctores.findAll);
    router.post("/update", doctores.update);

    app.use('/api/doctores', router);
};