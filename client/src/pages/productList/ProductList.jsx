import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

export default function ProductList() {


  const [data, setData] = useState([])
  const fetchData = async () => {
      const response = await axios(
          'http://localhost:5000/API/products',
      )
      setData(response.data)

  }
  useEffect(() => {
      fetchData()
  }, [])


  const handleDelete = (id) => {
  axios.delete(`http://localhost:5000/API/products/${id}`)
  setData(data.filter((item) => item._id !== id));
    
  };

  const columns = [
    { field: "name", headerName: "Name", width: 99 },
    
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        
        return (
          <>
            <Link to={{
              pathname :  `/product/${params.row.name}`,
              state : data
            }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid style={{marginLeft: '30px', borderRadius: '30px' , width : '50%'}}
      getRowId={(row) => row._id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
