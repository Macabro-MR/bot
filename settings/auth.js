// auth.js
const readline = require('readline');
const { verificar_nome } = require('./db');
const User = require('./model');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function authenticate() {
  let tries = 3;

  while (tries > 0) {
    rl.question('Digite o nome de usuário: ', async (username) => {
      const userExists = await verificar_nome(username);

      if (userExists) {
        rl.question('Digite a senha: ', async (password) => {
          const user = await User.findOne({ username, password });

          if (user) {
            console.log('Autenticado com sucesso. Iniciando o script...');
            rl.close();
            require('./index.js'); // Nome do arquivo principal
          } else {
            tries--;
            console.log(`Senha incorreta. Tentaivas restantes: ${tries}`);
          }
        });
      } else {
        console.log('Nome de usuário não encontrado. Tente novamente.');
      }
    });
  }

  rl.on('close', () => {
    console.log('Máximo de tentativas atingido. Encerrando o script.');
    process.exit(1);
  });
}

module.exports = authenticate;
