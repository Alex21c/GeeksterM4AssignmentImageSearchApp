'use strict';
class Model{
  constructor(){
   this.unsplash={
    applicaitonId : 557954,
    accessKey: 'ITVhbSudRz73f0zvepdLyFWTWxx41FWMXvKvN8TIWx4',      
   }
   this.page=1;   
   
  }

  async fetchPhotos(query){
    let request =  `https://api.unsplash.com/search/photos/?client_id=${this.unsplash.accessKey}&query=${query}&page=${this.page}`;
    // let request =  `Testing/response.json`;
    // console.log(request);
    // return;
    // console.log(request);    
    try{
      let response = await fetch(request);
      let jsonResponse = await response.json();
      let {results} = jsonResponse;
      // console.log(results);
      // incrementing page number
      ++this.page;
      return results;      

    }catch(error){
      console.error('Alex21C-ERROR: Unable to load content from API.', error);
      return false;
    }
    
  }    
  

}
