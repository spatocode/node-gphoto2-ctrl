import { spawn } from 'child_process'
import { existsSync } from 'fs';
import hasbin from 'hasbin'

export default class Gphoto2 {
    constructor(gphoto2Location) {
        if(!existsSync(gphoto2Location) && !hasbin.sync("gphoto2")) {
            throw console.error("Unable to find gphoto2 binary")
        }
        this.gphoto2Binary = gphoto2Location || "gphoto2"
        this.configs = []
    }

    listCameras(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-cameras'])
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    listPorts(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-ports'])
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    listFiles(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-files'])
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    getFile(fileRange, callback) {
        const process = spawn(this.gphoto2Binary, [`--get-file ${fileRange}`])
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    getAllFiles(callback) {
        const params = ['--get-all-files']
        const process = spawnSync(this.gphoto2Binary, params)
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    captureImage(interval, hookScript, callback) {
        let params = [
            '--capture-image',
            `--interval ${interval}`,
            `--hook-script ${hookScript}`
        ]
        const process = spawn(this.gphoto2Binary, params)
        process.stderr.on('data', (err) => callback(err.toString()))
    }

    _queueConfigCommand(config) {
        const configPath = config.split("=")
        const _path = configPath[0]
        const value = configPath[1]
        const index = -1
        this.configs.some((config, i) => {
            index = config.path == _path ? i : -1
            return config.path == _path
        })
        if(index == -1) {
            this.configs.push({path: _path, value: value[1]})
        }
        else {
            this.configs[index] = {path: _path, value: value}
        }
    }
    setConfig(config, callback) {
        if(!config && !config.includes("=")) {
            throw console.error("Missing proper config parameter")
        }
        this._queueConfigCommand(config)
        const process = spawn(this.gphoto2Binary, ['--set-config', `${config}`])
        process.stderr.on('data', (err) => callback(err.toString()))
    }

    setConfigValue(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--set-config-value', `${config}`])
        process.stderr.on('data', (err) => callback(err.toString()))
    }

    getConfig(config, callback) {
        const process = spawn(this.gphoto2Binary, ['--get-config', `${config}`])
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    listConfig(callback) {
        const process = spawn(this.gphoto2Binary, ['--list-config'])
        process.stdout.on('data', (data) => callback(data.toString()))
        process.stderr.on('data', (err) => callback(null, err.toString()))
    }

    reset(callback) {
        const process = spawn(this.gphoto2Binary, ['--reset'])
        process.stderr.on('data', (err) => callback(err.toString()))
    }
}
