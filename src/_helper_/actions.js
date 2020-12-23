import {GETCONTACT,ADDCONTACT,EDITCONTACT,DELETECONTACT} from './api';
import {jsondata} from './jsondata';

export const getContacts = () =>{
    return (dispatch)=>{
       dispatch(ContactsResponse(jsondata))
    }
  }
  
  export const editContact= (data,contactData) =>{
    return (dispatch)=>{
      let copyObject=contactData
      let index=copyObject.findIndex(i=> i.id === data.id)
      copyObject[index].name=data.name;
      copyObject[index].email=data.email;
      copyObject[index].phonenumber=data.phonenumber;
      dispatch(editContactResponse(copyObject))
   }
  }

  export const addContact = (data,contactData) =>{
    return (dispatch)=>{
      let buf = new Uint8Array(3);
      window.crypto.getRandomValues(buf);
      data.id= buf[0]+buf[1]+buf[2];
      let copyObject=contactData
      copyObject.push(data)
       dispatch(addContactResponse(copyObject))
    }
  }

  export const deleteContact = (data) =>{
    return (dispatch)=>{
      dispatch(deleteContactResponse(data))
    }
  }

 export const ContactsResponse = (response) =>{
    return {
        type:GETCONTACT,
        payload:response 
    }
}

export const addContactResponse = (response) =>{
  return {
      type:ADDCONTACT,
      payload:response 
  }
}

export const editContactResponse = (response) =>{
   return {
       type:EDITCONTACT,
       payload:response 
   }
 }

 export const deleteContactResponse= (response) =>{
  return {
      type:DELETECONTACT,
      payload:response 
  }
}
 


