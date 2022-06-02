'use strict'
//dependencias
var express = require ('express');
var bodyParser= require('body-parser');
const app= express();
const hbs= require('express-handlebars');
// const formidable=require('express-form-data')
var path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const api= require('./routes')
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use('/api', api)
// app.get('/login', (req, res)=>{
// 	res.render('login')
// })
app.get('/', (req, res)=>{
	res.render('index')
})

//ejecutar express

var XLSX= require('xlsx');
var fs = require('fs');
var arrayCSV=[]
function verExcel(ruta){
    const workbook= XLSX.readFile(ruta);
    const workBookSheets= workbook.SheetNames;

    //console.log(workBookSheets);
    const sheet=workBookSheets[0];
    const dataExcel=XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    /*
    console.log(dataExcel[0].N_Plu)
    console.log(dataExcel[0].Descripcion)
    console.log(dataExcel[0].Barra)
    */
    
   
    for (let index = 0; index < dataExcel.length; index++) {
        
        const element = dataExcel[index];
        var lista={};
        const editor =dataExcel[index].Barra
        var precio=Number(dataExcel[index]["Precio Etiqueta"]).toFixed(2)
        //console.log(editor.slice(2, -1))
        //console.log(element)
        lista.N_PLU=dataExcel[index].N_Plu
        lista.Descripcion=dataExcel[index].Descripcion
        lista["Precio Etiqueta"]=precio
        lista.flag=dataExcel[index].Barra.substr(0,2)
        lista.plucode=dataExcel[index].Barra.slice(2)
        lista.colum1=0
        lista.colum2=0
        lista.colum3=0
        lista.colum4=0
        arrayCSV.push(lista);
        
    }
    //console.log(contador);
    //console.log(arrayCSV)
    /*
    for (const itemFila of dataExcel) {
        console.log(itemFila)
        console.log(dataExcel[itemFila].N_Plu)
        lista+= 'N_Plu:' +  +
        'Descripcion:' + dataExcel[itemFila].Descripcion + 
        'Barra:' + dataExcel[itemFila].Barra +'\n';
    }
    */
   
   return arrayCSV;
}

//console.log(verExcel('aprob-requerimientos.xls'))

function convertToCSV(objArray) {
    //objArray= verExcel('aprob-requerimientos.xls');
    const array = objArray;
    var longitud= (array.length)/2;
    let str = "";

    for (let i = 0; i < longitud; i++) {
     let line = "";
     
     for (let index in array[i]) { 
      if (line != "") line += ",";line += array[i][index];
     }str += line + "\r\n";
     
    }
    /*
    if (headers) {
        str.unshift(headers);
       }
       */
    //return array;
    return str;
    //return longitud
    
   }
   //descomentar si quiere que genere filename.csv de verdad
/*
   fs.writeFile('Filename.csv', convertToCSV(verExcel('aprob-requerimientos.xls')), (err) => {
    if (err) throw err;
    //console.log('File created');
 });
*/
 //exportar modulo
module.exports=app;