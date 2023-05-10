const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'JornalDev',
    password: 'borespedro1',
    port: 5473
});

const connection = {
    init: () => {
        client.connect()
        .then(() => {
            console.log('Conexão estabelecida com sucesso');
        })
        .catch((err) => {
            console.error('Ocorreu um erro:', err);
        })
    },
    destroy: () => {
        client.end()
        .then(() => {
            console.log('Conexão encerrada com sucesso!');
        })
        .catch((err) => {
            console.error('Ocorreu um erro:', err);
        })
    }
}



module.exports = {
    client,
    connection
};
