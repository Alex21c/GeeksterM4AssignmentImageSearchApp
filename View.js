'use strict';
class View{

  constructor(model){
    this.model = model;     
    this.divResults = document.querySelector('div#divResults');
    this.btnCloseLightBox = document.querySelector('button#btnCloseLightBox');
    this.divLightBox = document.querySelector('div#divLightBox');
    this.btnLoadMoreImages = document.querySelector('button#btnLoadMoreImages');
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
      // document.addEventListener('DOMContentLoaded', ()=>{this.lazyLoadImages()});
      window.addEventListener('scroll', this.showOrHideBtnLoadMoreImages);

    // console.log(this.btnCloseLightBox);
    // requesting

  }



  showOrHideBtnLoadMoreImages(){
    if(window.scrollY >200){
      this.btnLoadMoreImages.classList.remove('displayNone');
    }else{
      this.btnLoadMoreImages.classList.add('displayNone');
    }
  }
  clearPhotos(){
    this.divResults.innerHTML='';
  }

  appendPhotos(results, query='query'){  
     
    if(!results){
      alert('error: unable to fetch new photos!');
      return;
    } 
    results.forEach((result)=>{
      let {alt_description, urls, links} = result;
      if(alt_description === null){
        alt_description = query;
      }
      // console.log(alt_description, urls, links);
      // console.log(alt_description);
      this.appendPhotosToDivResults(urls.regular, links.html, alt_description);
    });

    // this.lazyLoadImage();
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
          <img data-el='theResultImg' class='w-[100%] h-[100%] object-cover transition-all duration-300 hover:scale-150  hover:cursor-zoom-in'  loading="lazy" src="${imgHref}" alt="${imgDescription}">
        </div>
        <h2><a class='text-slate-300 underline font-medium text-lg' href='${imgPageURL}'>${imgDescription}</a></h2>      
      `;
      this.divResults.append(divWrapperImgAndDescription);
      let img=divWrapperImgAndDescription.querySelector('img');
  

  }

    
  
  
}  

