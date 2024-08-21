// const express = require('express');
// const docxtemplater = require('docxtemplater');
// const PizZip = require('pizzip');
// const fs = require('fs');

// const app = express();

// app.post('/generate-docx', (req, res) => {
//  const data = req.body;

//  const zip = new PizZip();
//  const doc = new docxtemplater().loadZip(zip);
//  doc.setData(data);
//  doc.render();
//  const buffer = doc.getZip().generate({ type: 'nodebuffer' });

//  res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
//  res.send(buffer);
// });

// app.listen(98, () => console.log('Server running on port '));
