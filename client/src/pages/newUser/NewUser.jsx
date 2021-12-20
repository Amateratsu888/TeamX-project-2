import "./newUser.css";
import { useState } from "react";
import axios from "axios";


export default function NewUser() {
  const [dataform, setDataform] = useState({
    firstname : '',
    lastname : '',
    address : ''
  });


  const formHandler = e =>{
    const newD = {...dataform}
    newD[e.target.id] = e.target.value
    setDataform(newD)
  }

  const submitHandler = (e) => {
    e.preventDefault();
      axios
        .post("http://localhost:5000/API/user", dataform)
        .then((res) => {
          if(res.status === 201)
          alert('utilisateur creer avec succes')
          setDataform({
            firstname : '',
            lastname : '',
            address : ''
          });
          
        })
        .catch((err) => {
          console.log(err)
        });
    } 
  

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form
        className="newUserForm"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className="newUserItem">
          <label>Firstname</label>
          <input
            type="text"
            id='firstname'
            onChange={(e) => formHandler(e)}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Lastname</label>
          <input
            type="text"
            id='lastname'
            onChange={(e) => formHandler(e)}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            id='address'
            onChange={(e) => formHandler(e)}
          />
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
};
