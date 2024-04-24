import { log } from 'console';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import mergePdfFunction from './testpdf.js';




const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express() 
const upload = multer({ dest: 'uploads/' })
const port = 3000

app.use(express.static('public')) // all the files in public folder can be accessed by http://localhost:3000/FILE_NAME , that file name should be in public folder

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'templates\\index.html'))
})

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
  // console.log(req.files) 
  // console.log(path.join(__dirname,req.files[0].path))
  // console.log(req.files[0].path);

  // console.log( 'name fo the file is : ', req.files[0].originalname)
  // console.log( 'size fo the file is : ', req.files[0].size)
  // console.log( 'path fo the file is : ', req.files[0].path)
  
// console.log(path.join(__dirname,req.files[0].path) ) // we are using __dirname below in mergefunction because we need to add full path 

let firstFilePath = path.join(__dirname,req.files[0].path)
let secondFilePath = path.join(__dirname,req.files[1].path)
console.log(firstFilePath)
console.log(secondFilePath)
let d = await mergePdfFunction(firstFilePath,secondFilePath)

  // res.send({hi: 'namaste'}) 

  // redirect using only static path with express 
  // res.redirect('mergedHuiPdf.pdf') 

  // redirect using full url path 
    res.redirect(`http://localhost:3000/${d}.pdf`);
})
 
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
  console.log(__dirname)
})

