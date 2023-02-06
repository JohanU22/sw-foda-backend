import express from 'express';
const router = express.Router();

import { Usuarios, IUsuario } from '@libs/Usuarios/Usuarios';
const usuariosModel = new Usuarios();

router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get", "url":"usuarios/all"},
        "getById": {"method":"get", "url":"usuarios/byid/:id"},
        "new": {"method":"post", "url":"usuarios/new"},
        "update": {"method":"put", "url":"usuarios/upd/:id"},
        "delete": {"method":"delete", "url":"usuarios/del/:id"}
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res)=>{
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res) => {
    const { id : codigo } = req.params;
    const usuario = usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error": "No se encontro el usuario"});
});

router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body);
    const {
        nombre = "John", 
        roles = "ADM",
        password = "",
        correo = "",
    } = req.body;
    
    const newUsuarios: IUsuario = {
        codigo : "",
        nombre,
        password,
        correo,
        roles
    };

    if(usuariosModel.add(newUsuarios)){
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar un nuevo Usuario"}
    );
});

router.put('/upd/:id', (req, res) =>{
    const { id } = req.params;
    const {
        nombre = "John", 
        roles = "ADM", 
        password,
        correo 
    } = req.body;

    const UpdateUsuario : IUsuario = {
        codigo: id,
        nombre,
        password,
        correo,
        roles
    };

    if (usuariosModel.update(UpdateUsuario)) {
        res.status(200).json({"updated": true});
    };

    return res.status(404).json({"error": "error al actualizar el usuario"});
});

router.delete('/del/:id', (req, res) => {
   const { id: codigo } = req.params;
    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    };
    return res.status(404).json({"error":"No se pudo eliminar el usuario"});
});

export default router;