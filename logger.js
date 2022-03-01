const moment = require('moment')
const colors = require('colors/safe')
const config = require('config')

function log() {
    if (config.get('debug')) {
        console.log(...arguments)
    }
}

function prefix(tag, color) {
    return [colors[color](`[${tag}]`), `${moment().format('HH:mm:ss.SSS')}`]
}

class logger {
    static info() {
        log(...prefix('INFO', 'cyan'), ...arguments)
    }
    static warn(v) {
        log(...prefix('WARN', 'yellow'), ...arguments)
    }
    static debug(v) {
        log(...prefix('DEBUG', 'green'), ...arguments)
    }
    static error(v) {
        log(...prefix('ERROR', 'red'), ...arguments)
    }
}

module.exports = logger
