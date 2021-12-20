import "./featuredInfo.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FeaturedInfo() {




  const [dataProduct, setDataProduct] = useState([])
  const [dataUser, setDataUser] = useState([])
  const fetchDataProduct = async () => {
      const response = await axios(
          'http://localhost:5000/API/products',
      )
      setDataProduct(response.data)

  }

  

const fetchDataUser = async () => {
  const response = await axios(
      'http://localhost:5000/API/users',
  )
  setDataUser(response.data)

}







  useEffect(() => {
      fetchDataProduct()
      fetchDataUser()
  }, [])


console.log(dataProduct, dataUser);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Products</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{dataProduct.length}</span>
        </div>
       
      </div>
      
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{dataUser.length}</span>
        </div>
        
      </div>
    </div>
  );
}
