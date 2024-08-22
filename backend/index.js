import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from "qr-image"
import {writeFileSync} from "fs"

const app = express();
const port = 3001;
const _dirname= dirname(fileURLToPath(import.meta.url))

app.use(express.static("../public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log("Server up and listening...");
});

app.get('/', (req,res)=>{
    res.sendFile(_dirname+"/../public/index.html")
}
)


app.post('/submit', (req,res)=>{
    const url = req.body.link 
    const qr_code= qr.imageSync(url, {type:"png",parse_url:true})
    writeFileSync('qr-code.png',qr_code, (err)=>{if (err) throw err; else console.log("successful qr generation")})
    res.setHeader("Content-Disposition", "attachment; filename=qr-code.png")
    res.setHeader("Content-Type", "image/png")
    res.sendFile(_dirname+"/qr-code.png")

}
)