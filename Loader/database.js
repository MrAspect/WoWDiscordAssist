let loader = require('./loader');
let mysql = require('mysql');

const database = loader.database();

class Database
{

    static Auth()
    {
        return mysql.createConnection({

            host: database.host,
            user: database.user,
            password: database.pass,
            database: database.dbauth,
            charset: database.charset

        });

    }

    static Characters()
    {
        return mysql.createConnection({

            host: database.host,
            user: database.user,
            password: database.pass,
            database: database.dbchars,
            charset: database.charset

        });

    }

    static World()
    {
        return mysql.createConnection({

            host: database.host,
            user: database.user,
            password: database.pass,
            database: database.dbworld,
            charset: database.charset

        });
        
    }

}

module.exports = Database;
