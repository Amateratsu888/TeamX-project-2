import "./newProduct.css";
import { useState } from "react";
import axios from "axios";
export default function NewProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    quantity: ""
  });
  const [img,setImg] = useState()

  const handleForm = e => {
    const newData = {...data}
    newData[e.target.id] = e.target.value 
    setData(newData)
  }

  const handleFile = e =>{
    setImg(e.target.files[0])

  }
  
const submitHandler = e =>{
  e.preventDefault()

  const newData = {...data, image : img}
  var formdata = new FormData()
  formdata.append('name',newData.name)
  formdata.append('price',newData.price)
  formdata.append('quantity',newData.quantity)
  formdata.append('image',newData.image)

  axios
  .post("http://localhost:5000/API/product", formdata)
  .then((res) => {
    if(res.status === 201){
    alert('Le produit a ete ajouter avec succes')
    setData({
      name: "",
      price: "",
      quantity: ""
    })}
  })
  .catch((err) => {
    alert('Seul les images aux format .PNG ou .JPG ou JPEG sont accepter ')
  })
}
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={e=>submitHandler(e)}>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => handleForm(e)}
            required
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
          required
            type="number"
            min="0"
            id="price"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input
          required
            type="number"
            min="0"
            id="quantity"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div className="addProductItem">
          <label>Image</label>
          <input
          required
          accept="image/*"
            type="file"
            id="image"
            name ="image"
            onChange={(e) => handleFile(e)}
          />
        </div>
        <button type="submit" className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
