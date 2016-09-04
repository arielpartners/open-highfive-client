const CONFIG = {
    proxyDomain: process.env.HIGHFIVE_API_SERVER || 'arielflash-server-dev.azurewebsites.net',
    hostPort: process.env.PORT || '2368',
    enableMocks: true,
    enableProxy: true
};

const ENV_CONFIGS = {
    production: {

    },
    development: {

    }
};

const TARGET_CONFIG = {
    production: {

    },
    development: {
        proxyDomain: 'arielflash-server-dev.azurewebsites.net',
        enableMocks: false,
        enableProxy: true
    },
    qa: {

    },
    uat: {

    },
    mock: {
        enableMocks: true,
        enableProxy: false
    }
};

//assign overrides based on environment
Object.assign(CONFIG, ENV_CONFIGS[process.env.NODE_ENV || 'development']);

//assign overrides based on command line targets (ie --mock)
process.argv.forEach(arg => {
    arg = arg.replace('--', '');
    if (TARGET_CONFIG.hasOwnProperty(arg)) Object.assign(CONFIG, TARGET_CONFIG[arg]);
});

console.log(JSON.stringify(CONFIG));

module.exports = CONFIG;