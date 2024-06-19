
export const getAll = async () => {
    // const response = await axios.get ('http://localhost:8000/api/foods')
    // if (response.success) return response.data
    let responseData;
    await fetch ('http://localhost:8000/api/foods',{
        method:'GET',
        headers:{
          Accept:"application/form-data",
          'Content-Type':"application/json"
        },
  
      }).then((res)=>res.json()).then((data)=>responseData=data)
    //   console.log(responseData)
      if (responseData.success){

        return responseData.data;
      }
     
}
export const search = async searchTerm =>{
    let responseData;
    await fetch (`http://localhost:8000/api/foods/search/${searchTerm}`).then(res=>res.json()).then((data)=>responseData=data)
    //   console.log(responseData)
      if (responseData.success){

        return responseData.data;
      }

}
    

export const getAllTags = async () => {
    let responseData;
    await fetch('http://localhost:8000/api/foods/tags',{
        method:'GET',
    }).then(res=>res.json()).then(data=>responseData=data)
    if (responseData.success) return responseData.data;
}
export const getAllByTag = async tag => {
    if (tag.toLowerCase() === 'all') return getAll();
    let responseData;
    await fetch(`http://localhost:8000/api/foods/tag/${tag}`,{
        method:'GET',
    }).then(res=>res.json()).then(data=>responseData=data)
    console.log(responseData)
    if (responseData.success) return responseData.data;
    
};
export const getById=async foodId=>{
    let responsedata;
    await fetch(`http://localhost:8000/api/foods/${foodId}`).then((res)=>res.json()).then(data=>responsedata=data)
    // console.log (responsedata.data)
    return responsedata.data;

}