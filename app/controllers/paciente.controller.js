const db = require("../models");
const Paciente = db.pacientes;

exports.create = (req, res) => {
    Paciente.create({
        nombre: req.body.nombre,
        edad: req.body.edad,
        id_doctor: req.body.id_doctor,
        foto: req.file ? req.file.filename : 'default.png'
    })
    .then(() => res.redirect('/vista-pacientes?msg=success'))
    .catch(err => res.status(500).send(err.message));
};

exports.update = (req, res) => {
    const id = req.body.id_paciente;
    
    const datosActualizados = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        id_doctor: req.body.id_doctor
    };

    if (req.file) {
        datosActualizados.foto = req.file.filename;
    }

    Paciente.update(datosActualizados, { where: { id_paciente: id } })
    .then(() => res.redirect('/vista-pacientes?msg=success'))
    .catch(err => res.status(500).send(err.message));
};

exports.findAll = (req, res) => {
    Paciente.findAll({ include: ["doctor"] })
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err.message));
};