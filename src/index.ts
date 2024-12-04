// 1. Go to the [Upload Preset](https://console.cloudinary.com/settings/upload/presets) settings
// 2. Create two presets, one for `dog-roman` and one for `dog-charlie`
// 3. Click `Add Upload Preset`
// 4. In the `General` tab
//     a. Enter `vertical-rounded` in the `Upload preset name` field
//     b. Select `Unsigned` for the `Signing mode`
//     c. Enter `cloudinary-upload-preset-demo/roman` in the `Folder` field
//     d. Check `Use filename or externally defined Public ID`
//     e. Uncheck `Unique filename`
// 5. In the `Transform` tab
//     1. Enter `c_auto,g_auto,w_450,h_800/r_20` for the `Incoming transformation`
//     2. Enter `f_auto/q_auto` for the `Eager transformations`
// 6. In the `Manage and Analyze` tab
//     1. Enter `portrait`, `rounded`, and `roman` in the `Tags` field
// 7. In the `Optimize and Deliver` tab
//     1. Enter `jpg, jpeg, png` in the `Allowed formats` field
// 8. Click `Save`
// 9. Click the dot menu and select `Duplicate` on the `dog-roman` preset
// 10. Click the dot menu and select `Edit` on the new preset
//     1. Rename it to `dog-charlie`
//     2. Change the `Folder` to `cloudinary-upload-preset-demo/charlie`
//     3. Change the `roman` tag to `charlie`
//     4. Click `Save`

import {v2 as cloudinary} from "cloudinary"
import "dotenv/config"
import fs from "node:fs"
import os from "node:os"

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

const dogsPath = `${os.homedir()}/Desktop/dogs`
const images = fs.readdirSync(dogsPath).filter(image => image !== ".DS_Store")

const promises = images.map(image => {
    const promise = cloudinary.uploader.upload(`${dogsPath}/${image}`, {
        upload_preset: `dog-${image.split("-")[0]}`,
    })

    return promise
})

const results = await Promise.all(promises)
results.forEach(result => console.log(result.url))
