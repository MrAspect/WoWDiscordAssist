module.exports.config = () => {

    const configAccess = '../Config/config.json';

    delete require.cache[require.resolve(configAccess)]

    let config;

    try {

        config = require(configAccess)

    } catch (e) {

        console.error('[ERROR] A configuration error has occurred.\nCheck your file : ' + configAccess);

    }

    return config;
}

module.exports.configcmd = () => {

    const configcmdAccess = '../Config/configcmd.json';

    delete require.cache[require.resolve(configcmdAccess)]

    let configcmd;

    try {

        configcmd = require(configcmdAccess)

    } catch (e) {

        console.error('[ERROR] A configuration error has occurred.\nCheck your file : ' + configcmdAccess);

    }

    return configcmd;
}

module.exports.database = () => {

    const databaseAccess = '../Config/database.json';

    delete require.cache[require.resolve(databaseAccess)]

    let database;

    try {

        database = require(databaseAccess)

    } catch (e) {

        console.error('[ERROR] A configuration error has occurred.\nCheck your file : ' + databaseAccess);

    }

    return database;
}