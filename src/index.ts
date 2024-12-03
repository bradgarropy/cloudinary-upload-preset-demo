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
