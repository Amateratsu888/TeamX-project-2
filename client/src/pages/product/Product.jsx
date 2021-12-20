import { Link , useLocation , useParams , useHistory} from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useState } from "react";
import axios from "axios";

export default function Product() {

    const {productId} = useParams()
    const history = useHistory()
    const data = useLocation()
    const productData = data.state.filter(item => item.name === productId)
    const [form,setForm] = useState({
        name: productData[0].name,
        price : productData[0].price,
        quantity : productData[0].quantity,
        image_filename:  productData[0].image_filename,
        image_path:  productData[0].image_path
    })

    const handleForm = (e) => {
        const newForm = {...form}
        newForm[e.target.id] = e.target.value
        setForm(newForm);
        
};

    const handleSubmit = e =>{
        e.preventDefault()
        axios.patch(`http://localhost:5000/API/product/${productData[0]._id}`,form)
        .then(res => {
          if(res.status === 200){
            alert('votre produit a été modifier avec succés')
            history.push('/products')
          }
        })
    
    }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Add new Produit</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="quantity" title="Stock Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{productData[0].name}</span>
          </div>
          <div className="productInfoBottom">
            
            <div className="productInfoItem">
              <span className="productInfoKey">price:</span>
              <span className="productInfoValue">{productData[0].price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">quantity:</span>
              <span className="productInfoValue">{productData[0].quantity}</span>
            </div>
          </div>
          <div className="productInfoImg">
            <img 
            src={`http://localhost:5000/images/${productData[0].image_filename}`}
            alt='product image'
            style={{height : '224px' , width : '224px'}}
            />
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit ={e=>handleSubmit(e)} >
          <div className="productFormLeft">
            <div className="addProductItem">
              <label>Name</label>
              <input
                type="text"
                id="name"
                onChange={(e) => handleForm(e)}
                value={form.name}
              />
            </div>
            <div className="addProductItem">
              <label>Quantity</label>
              <input
                type="number"
                min="0"
                id="quantity"
                onChange={(e) => handleForm(e)}
                value={form.quantity}
              />
            </div>
            <div className="addProductItem">
              <label>price</label>
              <input
                type="number"
                min="0"
                id="price"
                onChange={(e) => handleForm(e)}
                value={form.price}
              />
            </div>
            
          </div>
          <div className="productFormRight">
            <div className="productUpload"></div>
            <button type='submit' className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
