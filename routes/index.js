'use strict'
var verExcel= require('../controllers/subida');
const express= require('express');
const api= express.Router();
var multiparty = require('connect-multiparty');
var md_upload = multiparty();
//var md_upload = multiparty({ uploadDir: './public/uploads/productos' });
const fs = require('fs');

//subidas
//subida de videos
api.post('/upload_video',md_upload , (req, res) => {
    let EDFile = req.files.picture.path
    console.log(EDFile)
   var target_path = './public/video/' + 'video.mp4';
   fs.rename(EDFile, target_path, function(err) {
      if (err) throw err;    
    /* fs.writeFile('video.mp4', EDFile, (err) => {
        if (err) throw err;
        //console.log('File created');
     });
     */
     res.status(200).render('index')
     
   });

})
//vistas

api.get('/descarga_apk_bodega', (req, res)=>{
	res.render('apk')
})

api.get('/subir_video', (req, res)=>{
	res.render('video')
})
api.get('/', (req, res)=>{
	res.render('index')
})
//descargas
api.get('/descargar',(req, res)=>{
    res.download('Filename.csv');
})

api.get('/descargarapk',(req, res)=>{
    res.download('InventarioCorales.apk');
})

api.get('/new',(req, res)=>{
    res.redirect('index');
})
module.exports= api
