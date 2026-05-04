const express = require("express");
const app = express();
const db = require("./app/models");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

db.sequelize.sync().then(() => {
    console.log("✅ Tablas sincronizadas en MySQL");
});

require("./app/routes/doctor.routes")(app);
require("./app/routes/paciente.routes")(app);

const CSS = `<style>
    body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; margin: 0; padding: 20px; color: #333; }
    .container { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 950px; margin: auto; text-align: center; }
    h1 { color: #1a73e8; margin-bottom: 10px; }
    h2 { color: #444; border-bottom: 2px solid #eee; padding-bottom: 10px; }
    .alert { background: #d4edda; color: #155724; padding: 12px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #c3e6cb; font-weight: bold; }
    .btn { padding: 10px 18px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; text-decoration: none; display: inline-block; transition: 0.3s; margin: 5px; font-size: 14px; }
    .btn-blue { background: #1a73e8; color: white; }
    .btn-green { background: #34a853; color: white; }
    .btn-red { background: #ea4335; color: white; }
    .btn-orange { background: #fbbc05; color: white; }
    .btn:hover { opacity: 0.8; transform: translateY(-2px); }
    form { background: #f9f9f9; padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: left; border: 1px solid #eee; }
    input, select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 10px; box-sizing: border-box; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; background: white; }
    th, td { border: 1px solid #eee; padding: 12px; text-align: left; }
    th { background: #f8f9fa; color: #555; }
    .img-pax { width: 50px; height: 50px; object-fit: cover; border-radius: 50%; border: 2px solid #1a73e8; }
</style>`;

app.get('/eliminar-doctor/:id', async (req, res) => {
    try {
        await db.doctores.destroy({ where: { id_doctor: req.params.id } });
        res.redirect('/vista-doctores?msg=eliminado');
    } catch (e) { res.send("Error: No se puede eliminar un médico con pacientes asignados."); }
});

app.get('/eliminar-paciente/:id', async (req, res) => {
    await db.pacientes.destroy({ where: { id_paciente: req.params.id } });
    res.redirect('/vista-pacientes?msg=eliminado');
});

// VISTA DE INICIO 
app.get('/', (req, res) => {
    res.send(`${CSS}
    <div class="container" style="max-width: 900px;">
        <header style="margin-bottom: 40px;">
            <h1 style="font-size: 3em;"> CRUD HOSPITAL TECSUP</h1>
            <p style="font-size: 1.2em; color: #666;">Innovación y cuidado al servicio de tu salud.</p>
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 40px; text-align: left;">
            <div style="background: #eef2ff; padding: 15px; border-radius: 10px; border-left: 5px solid #1a73e8;">
                <h4 style="margin: 0; color: #1a73e8;">Especialidades</h4>
                <p style="font-size: 0.85em; margin-top: 5px;">Contamos con especialistas en cardiología, pediatría y cirugía general.</p>
            </div>
            <div style="background: #f0fff4; padding: 15px; border-radius: 10px; border-left: 5px solid #34a853;">
                <h4 style="margin: 0; color: #34a853;">Emergencias</h4>
                <p style="font-size: 0.85em; margin-top: 5px;">Atención inmediata y equipo de vanguardia disponible las 24 horas.</p>
            </div>
            <div style="background: #fffaf0; padding: 15px; border-radius: 10px; border-left: 5px solid #f6ad55;">
                <h4 style="margin: 0; color: #f6ad55;"> Gestión Digital</h4>
                <p style="font-size: 0.85em; margin-top: 5px;">Registro eficiente de pacientes y doctores mediante plataforma digital.</p>
            </div>
        </div>

        <div style="background: #fff; padding: 30px; border: 1px solid #eee; border-radius: 15px;">
            <h3>¿Qué deseas gestionar hoy?</h3>
            <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
                <a href="/vista-doctores" class="btn btn-blue" style="flex: 1; padding: 20px;">Módulo de Doctores</a>
                <a href="/vista-pacientes" class="btn btn-green" style="flex: 1; padding: 20px;">Módulo de Pacientes</a>
            </div>
        </div>
        <footer style="margin-top: 40px; color: #aaa;">
            <p>&copy; 2026 Hospital TECSUP - Sistema de Gestión de Salud</p>
        </footer>
    </div>`);
});

// VISTA DE DOCTORES
app.get('/vista-doctores', async (req, res) => {
    const editId = req.query.edit;
    const msg = req.query.msg;
    let doctorAEditar = editId ? await db.doctores.findByPk(editId) : null;

    const docs = await db.doctores.findAll();
    let rows = docs.map(d => `
        <tr>
            <td>${d.id_doctor}</td>
            <td>${d.nombre}</td>
            <td>${d.especialidad}</td>
            <td>
                <a href="/vista-doctores?edit=${d.id_doctor}" class="btn btn-orange">Editar</a>
                <a href="/eliminar-doctor/${d.id_doctor}" class="btn btn-red" onclick="return confirm('¿Eliminar doctor?')">Eliminar</a>
            </td>
        </tr>`).join('');

    res.send(`${CSS}
    <div class="container">
        ${msg === 'success' ? '<div class="alert"> Operación realizada con éxito</div>' : ''}
        ${msg === 'eliminado' ? '<div class="alert" style="background:#f8d7da; color:#721c24;">🗑️ Registro eliminado</div>' : ''}
        
        <h2>${doctorAEditar ? ' Editar Médico' : ' Registro de Doctores'}</h2>
        <form action="/api/doctores${doctorAEditar ? '/update' : ''}" method="POST">
            ${doctorAEditar ? `<input type="hidden" name="id_doctor" value="${doctorAEditar.id_doctor}">` : ''}
            <input name="nombre" value="${doctorAEditar ? doctorAEditar.nombre : ''}" placeholder="Nombre del Doctor" required>
            <input name="especialidad" value="${doctorAEditar ? doctorAEditar.especialidad : ''}" placeholder="Especialidad" required>
            <button type="submit" class="btn btn-blue" style="width:100%">${doctorAEditar ? 'Actualizar Doctor' : 'Guardar Doctor'}</button>
            ${doctorAEditar ? `<center><a href="/vista-doctores">Cancelar Edición</a></center>` : ''}
        </form>
        <table>
            <tr><th>ID</th><th>Nombre</th><th>Especialidad</th><th>Acciones</th></tr>
            ${rows || '<tr><td colspan="4">No hay registros</td></tr>'}
        </table>
        <br><a href="/" style="color:#666;"> <- Volver al Inicio</a>
    </div>`);
});

app.get('/vista-pacientes', async (req, res) => {
    const editId = req.query.edit;
    const msg = req.query.msg;
    let pacAEditar = editId ? await db.pacientes.findByPk(editId) : null;

    const docs = await db.doctores.findAll();
    const pacs = await db.pacientes.findAll({ include: ["doctor"] });
    
    let options = docs.map(d => `<option value="${d.id_doctor}" ${pacAEditar && pacAEditar.id_doctor == d.id_doctor ? 'selected' : ''}>${d.nombre}</option>`).join('');
    
    let rows = pacs.map(p => {
        const fotoHTML = (p.foto && p.foto !== 'default.png') 
            ? `<img src="/uploads/${p.foto}" class="img-pax">` 
            : `<div style="width:50px; height:50px; background:#e0e0e0; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:25px; border: 2px solid #ccc; margin:auto;">👤</div>`;
        
        return `
        <tr>
            <td>${p.id_paciente}</td>
            <td>${p.nombre}</td>
            <td>${p.edad}</td>
            <td>${p.doctor ? p.doctor.nombre : 'N/A'}</td>
            <td style="text-align:center;">${fotoHTML}</td>
            <td>
                <a href="/vista-pacientes?edit=${p.id_paciente}" class="btn btn-orange">Editar</a>
                <a href="/eliminar-paciente/${p.id_paciente}" class="btn btn-red" onclick="return confirm('¿Eliminar paciente?')">Eliminar</a>
            </td>
        </tr>`;
    }).join('');

    res.send(`${CSS}
    <div class="container">
        ${msg === 'success' ? '<div class="alert"> Operación realizada con éxito</div>' : ''}
        ${msg === 'eliminado' ? '<div class="alert" style="background:#f8d7da; color:#721c24;">🗑️ Registro eliminado</div>' : ''}

        <h2>${pacAEditar ? ' Editar Paciente' : ' Registro de Pacientes'}</h2>
        <form action="/api/pacientes${pacAEditar ? '/update' : ''}" method="POST" enctype="multipart/form-data">
            ${pacAEditar ? `<input type="hidden" name="id_paciente" value="${pacAEditar.id_paciente}">` : ''}
            <input name="nombre" value="${pacAEditar ? pacAEditar.nombre : ''}" placeholder="Nombre completo" required>
            <input type="number" name="edad" value="${pacAEditar ? pacAEditar.edad : ''}" placeholder="Edad" required>
            <select name="id_doctor" required>
                <option value="">-- Seleccione médico --</option>
                ${options}
            </select>
            <label style="display:block; margin: 10px 0 5px; font-size: 12px; text-align:left;">Foto (Opcional):</label>
            <input type="file" name="foto">
            <button type="submit" class="btn btn-green" style="width:100%; margin-top:10px;">${pacAEditar ? 'Actualizar Paciente' : 'Registrar Paciente'}</button>
            ${pacAEditar ? `<center><a href="/vista-pacientes">Cancelar Edición</a></center>` : ''}
        </form>
        <table>
            <tr><th>ID</th><th>Nombre</th><th>Edad</th><th>Médico</th><th>Foto</th><th>Acciones</th></tr>
            ${rows || '<tr><td colspan="6" style="text-align:center;">No hay registros</td></tr>'}
        </table>
        <br><a href="/" style="color:#666;"> <- Volver al Inicio</a>
    </div>`);
});

const PORT = 3000;
app.listen(PORT, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));