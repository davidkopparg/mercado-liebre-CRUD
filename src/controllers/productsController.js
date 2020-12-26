const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// definimos multer para subir archivos



const controller = {
	// Root - Show all products
	index: (req, res) => {

		res.render("products",{products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let codigo=req.params.id;
		let resultado=products.find(busca=>busca.id==codigo);
		let precioDescuento=0;
		
		if (resultado.discount!=0){
		precioDescuento=resultado.price-resultado.price*resultado.discount/100;
		}else{
		precioDescuento=resultado.price;	
		}
		
		res.render("detail",{resultado,precioDescuento});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form")
	},
	
	// Create -  Method to store
	store: (req, res) => {
	products.push({id:Date.now(), 
		name: req.body.name,
		price: req.body.price,
		 discount:req.body.discount,
		 category: req.body.category,
		 description:req.body.description,
		 image: req.files[0].filename,
		 
			  });
			  
		let producto=JSON.stringify(products);
			  fs.writeFileSync(productsFilePath, producto);
		
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let codigo=req.params.id;
		let resultado=products.find(busca=>busca.id==codigo);

		res.render("product-edit-form",{resultado});
	},
	// Update - Method to update
	update: (req, res) => {
		
	

		products.forEach((producto)=>{
		if (producto.id==req.params.id){
	
		producto.name= req.body.name
		producto.price= req.body.price
		producto.discount=req.body.discount
		producto.category= req.body.category
		producto.description=req.body.description
		producto.image=req.files[0].filename
			
		}
		
	})

	let producto=JSON.stringify(products);
	fs.writeFileSync(productsFilePath, producto);
	res.redirect('/')
	},
		
		
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const  filtrado= products.filter((producto)=>
			producto.id != req.params.id)
	
		let producto=JSON.stringify(filtrado);
		fs.writeFileSync(productsFilePath, producto);
		res.redirect('/')
		},
	
};

module.exports = controller;