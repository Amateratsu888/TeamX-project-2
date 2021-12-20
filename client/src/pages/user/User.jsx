
import { Link , useParams, useLocation, useHistory} from "react-router-dom"; 
import { useState } from "react";
import "./user.css";
import axios from "axios";

export default function User() {

  const {userId} = useParams()
  const data = useLocation()
  const history = useHistory()
  const userData = data.state.filter(item => item._id === userId)
  const [form,setForm] = useState({
    firstname : userData[0].firstname,
    lastname : userData[0].lastname,
    address : userData[0].address
  })
  


  const formHandler = e =>{
    const newForm = {...form}
    newForm[e.target.id] = e.target.value
    setForm(newForm)

    
  }
  
  const submitHandler = e => {
    e.preventDefault()
    axios.patch(`http://localhost:5000/API/user/${userData[0]._id}`,form)
    .then(res =>{
      if(res.status === 200){
        alert("l'utilisateur a été modifier avec succés")
        history.push('/users')
      }
    })
    .catch(err=> console.log(err))
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={e=>submitHandler(e)} >
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Fistname</label>
                <input type="text" className="userUpdateInput" 
                required
                value={form.firstname}
                onChange={e=>formHandler(e)}
                id='firstname'
                />
              </div>
              <div className="userUpdateItem">
                <label>Lastname</label>
                <input
                onChange={e=>formHandler(e)}
                id='lastname'
                  type="text"
                  className="userUpdateInput"
                  value={form.lastname}
                  required
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                onChange={e=>formHandler(e)}
                  id = 'address'
                  type="text"
                  value={form.address}
                />
              </div>
              
            
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
