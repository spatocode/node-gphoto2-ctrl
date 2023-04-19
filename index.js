const { hasbin } = require('hasbin')
const { spawnSync, spawn } = require('child_process')

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

    listCamerasSync() {
        const cameras = spawnSync(this.gphoto2Binary, ['--list-cameras'])
        return cameras.stdout
    }

    listPorts(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-ports'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    listPortsSync() {
        const ports = spawnSync(this.gphoto2Binary, ['--list-ports'])
        return ports.stdout
    }

    listFiles(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-files'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    listFilesSync() {
        const files = spawnSync(this.gphoto2Binary, ['--list-files'])
        return files.stdout
    }

    getFile(fileRange, callback) {
        const process = spawn(this.gphoto2Binary, [`--get-file ${fileRange}`])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    getFileSync(fileRange) {
        const params = [`--get-file ${fileRange}`]
        const file = spawnSync(this.gphoto2Binary, params)
        return file.stdout
    }

    getAllFiles(callback) {
        const params = ['--get-all-files']
        const process = spawnSync(this.gphoto2Binary, params)
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    getAllFilesSync() {
        const params = ['--get-all-files']
        const files = spawnSync(this.gphoto2Binary, params)
        return files.stdout
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

    captureImageSync(interval, hookScript) {
        let params = [
            '--capture-image',
            `--interval ${interval}`,
            `--hook-script ${hookScript}`
        ]
        spawnSync(this.gphoto2Binary, params)
    }

    setConfig(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--set-config', `${config}`])
        process.stderr.on('data', (err) => callback(err))
    }

    setConfigSync(config) {
        spawnSync(this.gphoto2Binary, ['--set-config', `${config}`])
    }

    setConfigValue(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--set-config-value', `${config}`])
        process.stderr.on('data', (err) => callback(err))
    }

    setConfigValueSync(config) {
        spawnSync(this.gphoto2Binary, ['--set-config-value', `${config}`])
    }

    getConfig(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--get-config', `${config}`])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    getConfigSync(config) {
        const config = spawnSync(this.gphoto2Binary, ['--get-config', `${config}`])
        return config.stdout
    }

    listConfig(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-config'])
        process.stdout.on('data', (data) => callback(data))
        process.stderr.on('data', (err) => callback(null, err))
    }

    listConfigSync() {
        const config = spawnSync(this.gphoto2Binary, ['--list-config'])
        return config.stdout
    }

    reset() {
        const process = spawn(this.gphoto2Binary, ['--reset'])
        process.stderr.on('data', (err) => callback(err))
    }

    resetSync() {
        spawnSync(this.gphoto2Binary, ['--reset'])
    }
}
