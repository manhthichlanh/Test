const exp = require("express");

const app = exp();

const bodyParser = require('body-parser');

const port = 3010;

app.use(exp.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(exp.static("public"));

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname )
  }
});
// const checkFileUpload = (req, file, cb) => {
//   console.log(`Tên file ${file.originalname}`);
//   if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)) {
//     cb(new Error(`Bạn chỉ được upload file ảnh`));
//   } else {
//     cb(`File name: ${file.originalname}`,true)
//   }

// }
var upload = multer({ storage: storage});
// var upload = multer({ storage: storage, fileFilter: checkFileUpload });

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});


app.listen(port,()=>{
    console.log(`Cổng hiện tại là: ${port}`)
});

//Câu 1
app.get("/",(req,res)=>{
    
    var today=new Date();

    currentDay=today.getDay();
    var day='';

    switch(currentDay){

    case 0:
        day='Chủ nhật';
        break;

    case 1:
        day = 'Thứ hai';
        break;

    case 2:
        day = 'Thứ ba';
        break;

    case 3:
        day = 'Thứ tư';
        break;

    case 4:
        day = 'Thứ năm';
        break;

    case 5:
        day = 'Thứ sáu';
        break;
    case 6:
        day = 'Thứ bảy';
        break;

    default:
        console.log(`Error: ${currentDay}`);
    }
    res.render('home',{kindOfDay:day});

});
//Câu 1

//Câu 2
const listProduct = [
    {
        id:1,
        title:'Warrent Buffett Rule',
        price:3000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book-1.jpg",
    },
    {
        id:2,
        title:'Bitcoin',
        price:2000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book-2.jpg",
    },
    {
        id:3,
        title:'Pay Black Time',
        price:1000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book-3.jpg",
    },
    {
        id:4,
        title:'Wall City',
        price:1000,
        description:"A very interesting book about so many even more interesting things!",
        imageURL:"book-4.jpg",
    }
     
];
app.get("/shop",(req,res)=>{
    res.render('shop',{products:listProduct});
})
//Câu 2

//Câu 3
app.get("/add_product",(req,res,next)=>{
    res.render("add-product");
})

app.post('/addnew', upload.single('productImage'), (req, res) => {
    //lấy dữ liệu từ form sau khi upload anh
    const file = req.file
    let title=req.body.productName;
    let price=req.body.price;
    let description=req.body.description;
    //Thêm vào mảng json 1 cuối sách mới

    listProduct.push({
        id: (listProduct.length +1),
        title:title,
        price:price,
        description:description,
        imageURL:file.filename,
    })
    // //chuyển về trang sản phẩm

        res.redirect('/shop');
    });
//Câu 3

//Câu 4 
app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const product = listProduct.find(p => p.id == id);
    if (product) {
      res.render('detail', { product });
    } else {
      res.status(404).send('Product not found');
    }

  });
//Câu 4 