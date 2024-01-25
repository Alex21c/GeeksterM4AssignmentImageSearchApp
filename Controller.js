'use strict';
class Controller{ 

  constructor(view, model){
    this.view = view;
    this.model = model;

    this.formSearchQuery = document.querySelector('form#formSearchQuery');
    this.inputSearch = document.querySelector('input#inputSearch');
    this.btnLoadMoreImages = document.querySelector('button#btnLoadMoreImages');
    this.btnLoadMoreImages.addEventListener('click', (event)=>{
      let query = this.inputSearch.value.trim();
      if(query.length>0){
        this.handleSearchQuery(query, true);
      }      
    });
    
    this.formSearchQuery.addEventListener('submit', (event)=>{
      event.preventDefault();
      // console.log(this.inputSearch.value, 'is the query');
      let query = this.inputSearch.value.trim();
      if(query.length>0){
        this.model.page=1; //reset to page 1
        this.handleSearchQuery(query);
      }
    })

    


  }

  async handleSearchQuery(query, keepPhotos=false){
    try{
      let results = await this.model.fetchPhotos(query);
      if(results.length===0){
        results=false;
      }
      if(!keepPhotos){
        this.view.clearPhotos();
      }
      this.view.appendPhotos(results, query);

    }catch(error){
      console.error(error);
    }
  }


}
