export interface IUsuario{
    codigo: string;
    nombre: string;
    password: string;
    correo: string;
    roles: [""];
    creado?: Date;
    ultimoAcceso?: Date;
}



export class Usuarios {
    private usuarios : IUsuario[];
    constructor(){
        this.usuarios = [];
    }
    add(nuevoUsuario : IUsuario ) {
        const date = new Date();
        const nuevo: IUsuario = {
            ...nuevoUsuario,
            codigo: (Math.random()*1000).toString()+new Date().getTime().toString(),
            creado:  date,
            ultimoAcceso: date
        }
        this.usuarios.push(nuevo);
        return true;
    }
    getAll(){
        return this.usuarios;
    }
    getById(codigo: string){
        const usuarioToReturn = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });
        return usuarioToReturn;
    }
    update(updateUsuario: IUsuario){
        const newUsuarios: IUsuario[] = this.usuarios.map((usu)=>{
            if(usu.codigo == updateUsuario.codigo) {
                return {...usu, ...updateUsuario, ultimoAcceso: new Date()};
            }
            return usu;
        });
        this.usuarios = newUsuarios;
        return true;
    }
    delete(codigo: string){
        const usuarioToDelete = this.usuarios.find((usu)=>{
            return usu.codigo === codigo;
        });
        if(usuarioToDelete){
            const newUsuarios: IUsuario[] = this.usuarios.filter((usu)=>{
                return usu.codigo !== codigo;
            });
            this.usuarios = newUsuarios;
            return true;
        }
        return false;
    }
}