'use strict';
class View{

  constructor(model){
    this.model = model;    
    this.page=1;
    this.query='home';  
    this.divResults = document.querySelector('div#divResults');
    this.btnCloseLightBox = document.querySelector('button#btnCloseLightBox');
    this.divLightBox = document.querySelector('div#divLightBox');
    // console.log(this.divLightBox);
    // attaching event listener
      this.btnCloseLightBox.addEventListener('click', (event)=>{
        this.hideLightBox();
      });
      this.divResults.addEventListener('click', (event)=>{        
        if(event.target.hasAttribute('data-el') && event.target.getAttribute('data-el') === 'theResultImg'){      
          this.showLightBox(event.target);
        }
      });

    // console.log(this.btnCloseLightBox);
    // requesting
    this.fetchPhotos()
  }

  showLightBox(eventTargetImgElement){
    let imgLightBox = this.divLightBox.querySelector('img.lightBoxImg');
    // console.log('showing lightbox, wait...', eventTargetImgElement, imgLightBox);
    // console.log(eventTargetImgElement.src);
    imgLightBox.src = eventTargetImgElement.src;
    this.divLightBox.classList.remove('displayNone');
    this.divLightBox.style.top = `${window.scrollY}px`;
    
  }

  hideLightBox(){
    // console.log(this.divLightBox);
    this.divLightBox.classList.add('displayNone');
  }

  
  appendPhotosToDivResults(imgHref, imgPageURL, imgDescription){
    // creating a div
      let divWrapperImgAndDescription = document.createElement('div');
      divWrapperImgAndDescription.setAttribute('class', 'wrapperImgAndDescription  w-96 h-80 flex flex-col gap-2');
      divWrapperImgAndDescription.innerHTML =`      
        <div class="wrapperImg transition-all  overflow-hidden w-96 h-64 rounded-md block  hover:ring-2 hover:ring-amber-400 hover:ring-offset-2">          
          <img data-el='theResultImg' class='object-cover transition-all duration-300 hover:scale-150  hover:cursor-zoom-in' src="${imgHref}">
        </div>
        <h2><a class='text-slate-300 underline font-medium text-lg' href='${imgPageURL}'>${imgDescription}</a></h2>      
      `;
      this.divResults.append(divWrapperImgAndDescription);

  }

  async fetchPhotos(){
    // let request =  `https://api.unsplash.com/search/photos/?client_id=${this.model.unsplash.accessKey}&query=${this.query}&page=${this.page}`;
    let request =  `Testing/response.json`;
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
        // console.log(alt_description, imageHref, pageURL);
        // console.log(alt_description);
        this.appendPhotosToDivResults(urls.regular, links.html, alt_description);
      });


    }catch(error){
      console.error('Alex21C-ERROR: Unable to load content from API.', error);
    }
    
  }      
  
  
}  

