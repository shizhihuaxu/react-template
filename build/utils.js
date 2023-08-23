const path = require('path')
const dotenv = require('dotenv')

const resolve = dir => path.resolve(__dirname, './../', dir)
const getEnv = dir => JSON.stringify(dotenv.config({ path: resolve(dir) }).parsed)

exports.resolve = resolve
exports.getEnv = getEnv
