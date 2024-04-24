import PDFMerger from 'pdf-merger-js';
// const PDFMerger = require('pdf-merger-js')

var merger = new PDFMerger();
 
const mergePdfFunction = async (p1,p2) => {
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge only page 2

  // await merger.add('1.pdf');  //merge all pages. parameter is the path to file and filename.
  // await merger.add('2.pdf'); // merge only page 2


  // Set metadata
  await merger.setMetadata({
    producer: "pdf-merger-js based script",
    author: "John Doe",
    creator: "John Doe",
    title: "My live as John Doe"
  });

  // await merger.save('public/mergedHuiPdf.pdf'); //save under given name and reset the internal document 
  // but we actually cannot save with one static name because if there are many users then it will overwrite the previous one. so we have to save it with a dynamic name.
  let d = new Date().getTime()
  await merger.save(`public/${d}.pdf`)

return d; //we need to return so we can access name of pdf in server.js file 

  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
};
 
// mergePdfFunction(2,3)
export default mergePdfFunction