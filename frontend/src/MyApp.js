import React, { useState, useEffect } from 'react'
import Table from './Table'
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]);
  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5000/users', person);
       if(response.status === 201){
        return response.data
       }
       else{
         console.log("Unable to post the user. Try again later!")
       }
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }

 async function makeDeleteCall(id){
  try {
     const response = await axios.delete('http://localhost:5000/users/' + id);
     if(response.status === 204){
      return response
     }
     else{
       console.log("404 Error! The person you tried to delete does not exist!")
     }
  }
  catch (error) {
     console.log(error);
     return false;
  }
 }

  function removeOneCharacter (index, id) {
    makeDeleteCall(id).then( result => {
      if (result){
        const updated = characters.filter((character, i) => {
          return i !== index
        });
        setCharacters(updated);
      }
    });
  }

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );
 
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:5000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result)
       setCharacters([...characters, result] );
    });
 }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;