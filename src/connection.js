const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_URL || "postgres://jornal_dr_pedro_db_user:ywqkH4IMeCsa0r7Oc19rGTews4uVwHTn@dpg-ch8hqttgk4q7lmqj4ifg-a.ohio-postgres.render.com/jornal_dr_pedro_db",
    ssl: true
});


module.exports = {
    pool
};
