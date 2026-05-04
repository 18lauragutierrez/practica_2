const db = require("../models");
const Doctor = db.doctores;

exports.create = (req, res) => {
    Doctor.create({
        nombre: req.body.nombre,
        especialidad: req.body.especialidad
    })
    .then(() => res.redirect('/vista-doctores?msg=success'))
    .catch(err => res.status(500).send(err.message));
};

exports.update = (req, res) => {
    const id = req.body.id_doctor;
    Doctor.update({
        nombre: req.body.nombre,
        especialidad: req.body.especialidad
    }, { where: { id_doctor: id } })
    .then(() => res.redirect('/vista-doctores?msg=success'))
    .catch(err => res.status(500).send(err.message));
};

exports.findAll = (req, res) => {
    Doctor.findAll()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err.message));
};