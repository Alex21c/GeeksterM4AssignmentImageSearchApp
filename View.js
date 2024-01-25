'use strict';
class View{

  constructor(model){
    this.model = model;    
    this.page=1;
    this.query='home';   
    // requesting
    this.fetchPhotos()
  }

  async fetchPhotos(){
    let request =  `https://api.unsplash.com/search/photos/?client_id=${this.model.unsplash.accessKey}&query=${this.query}&page=${this.page}`;
    // let request =  `Testing/response.json`;
    // console.log(request);    
    try{
      let response = await fetch(request);
      let jsonResponse = await response.json();
      let {results} = jsonResponse;
      results.forEach((result)=>{
        let {alt_description, urls, links} = result;
        if(alt_description === null){
          alt_description = this.query;
        }
        let imageHref = urls.regular;
        let pageURL = links.html;
        // console.log(alt_description, imageHref, pageURL);
        console.log(alt_description);
      });


    }catch(error){
      console.error('Alex21C-ERROR: Unable to load content from API.');
    }
    
  }      
  
  
}  

