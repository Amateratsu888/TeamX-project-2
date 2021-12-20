import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserList() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/API/users");
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/API/user/${id}`);
    const NewData = data.filter((item) => item._id !== id);
    setData(NewData);
  };

  const columns = [
    
    {
      field: "firstname",
      headerName: "Fistname",
      width: 100,
    },
    { field: "lastname", headerName: "Lastname", width: 200 },
    {
      field: "address",
      headerName: "Address",
      width: 100,
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/user/${params.row._id}`,
                state: data,
              }}
            >
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        style={{ marginLeft: "30px", borderRadius: "30px", width : "60%" }}
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
