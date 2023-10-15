const { usuario } = require('./model');

    async function add_usuario(nome, senha) {
        let obj = { nome, senha };
        usuario.create(obj);
    } 
    
    async function verificar_nome(nome) {
        let usuarios = await usuario.findOne({nome: nome});
        if(usuarios !== null) {
            return usuarios.nome;
        } else {
            return false;
        }
    }    
    
    async function Totalregistrados() {
        let db = await usuario.find({})
        return db.length
    }    

//NÃO MEXA    
module.exports.add_usuario = add_usuario;
module.exports.verificar_nome = verificar_nome;
module.exports.Totalregistrados = Totalregistrados;