const initialState={
  placedata:null
}


const reducer=(state=initialState,action)=>{

    switch(action.type){
      case 'SET_DATA':
{  

      return { placedata:{...action.payload}}
}


default: return state;
 
}

}

export default reducer;