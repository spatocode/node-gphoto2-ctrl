const Gphoto2 = require("node-gphoto2-ctrl");

const gphoto2 = new Gphoto2("./gphoto2.exe")

gphoto2.listConfig((data, err) => {
    if(err) {
        console.error(err)
        return
    }
    console.log(data)
})

gphoto2.setConfig("/main/capturesettings/shutterspeed=30", (data, err) => {
    if(err) {
        console.error(err)
        return
    }
    console.log(data)
})
