import express from 'express';
const router  = express.Router();


import empresasRouter from './empresas/empresas';
import usuariosRouter from './usuarios/usuarios';
//REST API
//Internet -> HTTP -> REST API -> DB
//SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { llave: valor }
// valor: texto, numerico, booleano, array [valores], objeto { llave: valor }

// REST stateless, resource unique representation
// CRUD Create, Read, Update, Delete
//        POST, GET, PUT, DELETE
router.get('/', (_req, res) => {
  res.json({msg:'Servidor Iniciado - Johan Urbina'});
 });

router.get('/version', (_req, res)=>{
  const version: string = "1.0.0";
  const jsonResp = {"name":'FOD Be', "version":version};
  // string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
});

router.use('/empresas', empresasRouter);
router.use('/usuarios', usuariosRouter);


export default router;
