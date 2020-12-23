import {GETCONTACT,ADDCONTACT,EDITCONTACT,DELETECONTACT} from './api'
const InitialValue={
    loader:false,
    contacts:[]
}

const config= (state=InitialValue,action)=>{
      switch(action.type){
          case 'LOADING':
            return{
                ...state,
                loader:true,
            }  
          case GETCONTACT:
            return{
                ...state,
                contacts:action.payload,
                loader:false, 
            }
            case ADDCONTACT:
              return{
                ...state,
                contacts:action.payload,
                loader:false, 
            }
            
            case EDITCONTACT:
              return{
                ...state,
                contacts:action.payload,
                loader:false, 
            }

            case DELETECONTACT:
              return{
                ...state,
                contacts:action.payload,
                loader:false, 
              }
          default :
          return state
      }  
  }
  
export default config;