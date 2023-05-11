const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://jornal_dr_pedro_db_user:ywqkH4IMeCsa0r7Oc19rGTews4uVwHTn@dpg-ch8hqttgk4q7lmqj4ifg-a.ohio-postgres.render.com/jornal_dr_pedro_db",
    ssl: true
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
