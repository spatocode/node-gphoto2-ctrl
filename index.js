const { hasbin } = require('hasbin')
const { spawn } = require('child_process')

export default class Gphoto2 {
    constructor(gphoto2Location) {
        if(!gphoto2Location && hasbin.sync("gphoto2") == undefined) {
            throw console.error("Unable to find gphoto2 binary");
        }
        this.gphoto2Binary = gphoto2Location || hasbin.sync("gphoto2")
    }

    listCameras(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-cameras'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    listPorts(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-ports'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    listFiles(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-files'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    getFile(fileRange, callback) {
        const process = spawn(this.gphoto2Binary, [`--get-file ${fileRange}`])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    getAllFiles(callback) {
        const params = ['--get-all-files']
        const process = spawnSync(this.gphoto2Binary, params)
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    captureImage(interval, hookScript, callback) {
        let params = [
            '--capture-image',
            `--interval ${interval}`,
            `--hook-script ${hookScript}`
        ]
        const process = spawn(this.gphoto2Binary, params)
        process.stderr.on('data', (err) => callback(err))
    }

    setConfig(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--set-config', `${config}`])
        process.stderr.on('data', (err) => callback(err))
    }

    setConfigValue(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--set-config-value', `${config}`])
        process.stderr.on('data', (err) => callback(err))
    }

    getConfig(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--get-config', `${config}`])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    listConfig(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-config'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    reset(callback) {
        const process = spawn(this.gphoto2Binary, ['--reset'])
        process.stderr.on('data', (err) => callback(err))
    }
}
