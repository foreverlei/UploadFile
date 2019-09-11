var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer')

var app = express();
// var upload = multer({ dest: 'upload/' });

// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({
//    extended: false,
// }));

// app.use(bodyParser.json());

let dateObject = new Date();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let dir =  "./" + dateObject.toLocaleDateString();
      console.log(dir)
      if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
        dir = dir + "/uploads"
        console.log(dir)
        fs.mkdirSync(dir)
      }
      cb(null, dir)
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, file.fieldname + '-' + Date.now()+file.originalname.substring(file.originalname.lastIndexOf(".")))
    }
  })
  
var upload = multer({ storage: storage })

// 单图上传
app.post('/upload-single', upload.single('logo'), function(req, res, next){
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    res.send({ret_code: '0',path:file.path});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
    res.send(form);
});

app.listen(3000);