function e(e){return e&&e.__esModule?e.default:e}const r="https://forkify-api.herokuapp.com/api/v2/recipes/";async function t(e){try{let r=fetch(e),t=await Promise.race([r,new Promise((e,r)=>setTimeout(()=>r(Error("Request took too long! Timeout after 10 second(s)")),1e4))]),s=await t.json();if(!t.ok)throw Error(`${s.message} (${t.status})`);return s}catch(e){throw e}}const s={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10,bookmarks:[]}};async function i(e){try{let i=await t(`${r}${e}`);if(!i?.data?.recipe)throw Error("Receta invalida ");let{recipe:n}=i.data;s.recipe={id:n.id,title:n.title,publisher:n.publisher,sourceUrl:n.source_url,image:n.image_url,servings:n.servings,cookingTime:n.cooking_time,ingredients:Array.isArray(n.ingredients)?n.ingredients:[]},console.log(s.recipe)}catch(e){throw e}}async function n(e){try{let i=await t(`${r}?search=${e}`);if(!i?.data?.recipes||!Array.isArray(i.data.recipes))throw Error("Receta inválida");s.search.query=e,s.search.results=i.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url}))}catch(e){throw console.log(`${e} \u{1F4A5}\u{1F4A5}\u{1F4A5}\u{1F4A5}`),e}}const a=function(e=s.search.page){s.search.page=e;let r=(e-1)*s.search.resultsPerPage,t=e*s.search.resultsPerPage;return s.search.results.slice(r,t)};var c={};c=import.meta.resolve("eyyUD");var l={};function o(e,r,t,s,i){var n,a,c,l;let o=[2,3,5];if(!0===i)for(let r=3;r*r<=e;r+=2)e%r==0&&o.push(r);let d=0,u=e,h=r;for(;d<=o.length;)u%o[d]==0&&h%o[d]==0?(o[d],u/=o[d],h/=o[d]):d++;return n=h,a=u,c=t,l=s,1===n&&1===a?(c=`${l}${(parseInt(c)+1).toString()}`,`${c}`):0===a?`${l}${c}`:"0"==c?`${l}${a}/${n}`:`${l}${c} ${a}/${n}`}l=function(e){let r,t;if(e<0?(e=Math.abs(e),r="-"):r="",void 0===e)return"Your input was undefined.";if(isNaN(e))return`"${e}" is not a number.`;if(1e16==e)return`${r}9999999999999999`;if(e>1e16)return"Too many digits in your integer to maintain IEEE 754 Floating Point conversion accuracy.";if(Number.isInteger(e))return`${r}${e}`;if(e<1e-6)return"0";let s=e.toString(),i=s.split("."),n=i[0];if("0"==t&&"0"!==n)return n;if("0"==t&&"0"==n)return"0";if("99"==(t=s.length>=17?i[1].slice(0,i[1].length-1):i[1])&&"0"!==n)return`${n} 99/100`;if("99"==t&&"0"==n)return"99/100";if(1-parseFloat(`.${t}`)<.0011&&(t="999"),void 0==t)return n;let a=t.split("").reverse().join("").match(/^(\d+)\1{1,2}/);if(!a||!(t.length>2)){var c,l,d;return c=t,l=n,d=r,o(parseInt(c,10),Math.pow(10,c.length),l,d,!1)}{let e=a[0].split("").reverse().join(""),s=a[1].split("").reverse().join("");if(s.length>1){let e=s.split(""),r=1;for(let t=0;t<e.length;t++)r/=e[0]/e[t];1===r&&(s=e[0])}return s.length>1&&s.length%2==0&&(s=parseInt(s.slice(0,s.length/2),10)-parseInt(s.slice(s.length/2,s.length),10)==0?s.slice(0,s.length/2):s),function(e,r,t,s,i){let n=e.length-t.length>=1?e.length-t.length:1,a=Math.pow(10,n),c=parseFloat(`0.${e}`),l=Math.pow(10,r.length);return o(Math.round((c*l-c)*Math.pow(10,n)),(l-1)*a,s,i,!0)}(t,s,e,n,r)}};class d{_data;render(e){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let r=`
      <div class="spinner">
        <svg>
          <use href="${e(c)}#icon-loader"></use>
        </svg>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderError(r=this._errorMessage){let t=`
      <div class="error">
        <div>
          <svg>
            <use href="${e(c)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(r=this._message){let t=`
      <div class="message">
        <div>
          <svg>
            <use href="${e(c)}#icon-smile"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}class u{_parentElement=document.querySelector(".recipe");_data;_errorMessage="no tecenmos esa  receta !";_message="Encontramos su receta !";render(e){this._data=e;let r=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderSpinner(){let r=`
      <div class="spinner">
        <svg>
          <use href="${e(c)}#icon-loader"></use>
        </svg>
      </div>
    `;this._parentElement.innerHTML="",this._parentElement.insertAdjacentHTML("afterbegin",r)}addHandlerRender(e){["hashchange","load"].forEach(r=>window.addEventListener(r,e))}renderError(r=this._errorMessage){let t=`
<div class="error">
    <div>
         <svg>
              <use href="${e(c)}#icon-alert-triangle"></use>
        </svg>
   </div>
  <p>${r}</p>
  </div>
  `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(r=this._message){let t=`
    <div class="message">
      <div>
        <svg>
          <use href="${e(c)}#icon-smile"></use>
        </svg>
      </div>
      <p>${r}</p>
    </div>
  `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}addHandlerRender(e){["hashchange","load"].forEach(r=>window.addEventListener(r,e))}_clear(){this._parentElement.innerHTML=""}_generateMarkup(){return`
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title"> <span>
          ${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(c)}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${e(c)}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${e(c)}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${e(c)}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${e(c)}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${e(c)}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">${this._data.ingredients.map(r=>`
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${e(c)}#icon-check"></use>
              </svg>
            <div class="recipe__quantity">${r.quantity?e(l)(r.quantity).toString():""}</div>
            <div class="recipe__description">
             <span class="recipe__unit">${r.unit}</span>
             ${r.description}
              </div>
            </li> `).join("")}
            </ul>
            </div>

        
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${e(c)}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `}}var h=new u;class g{_parentEl=document.querySelector(".search");getQuery(){let e=this._parentEl.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentEl.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentEl.addEventListener("submit",function(r){r.preventDefault(),e()})}}var p=new g;class _ extends d{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query. Please try again!";_message="";_generateMarkup(){return this._data&&0!==this._data.length?this._data.map(this._generateMarkupPreview).join(""):this.renderError(this._errorMessage)}_generateMarkupPreview(e){return`
      <li class="preview">
        <a class="preview__link" href="#${e.id}">
          <figure class="preview__fig">
            <img src="${e.image}" alt="${e.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${e.title}</h4>
            <p class="preview__publisher">${e.publisher}</p>
            <div class="preview__user-generated"></div>
          </div>
        </a>
      </li>`}}var v=new _;class f{_data;render(e){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let r=`
      <div class="spinner">
        <svg>
          <use href="${e(c)}#icon-loader"></use>
        </svg>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderError(r=this._errorMessage){let t=`
      <div class="error">
        <div>
          <svg>
            <use href="${e(c)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(r=this._message){let t=`
      <div class="message">
        <div>
          <svg>
            <use href="${e(c)}#icon-smile"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}class $ extends f{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(r){let t=r.target.closest(".btn--inline");t&&e(+t.dataset.goto)})}_generateMarkup(){let r=this._data.page,t=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===r&&t>1?`
        <button data-goto="${r+1}" class="btn--inline pagination__btn--next">
          <span>Page ${r+1}</span>
          <svg class="search__icon">
            <use href="${e(c)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:r===t&&t>1?`
        <button data-goto="${r-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${e(c)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${r-1}</span>
        </button>
      `:r<t?`
        <button data-goto="${r-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${e(c)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${r-1}</span>
        </button>

        <button data-goto="${r+1}" class="btn--inline pagination__btn--next">
          <span>Page ${r+1}</span>
          <svg class="search__icon">
            <use href="${e(c)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:""}}var m=new $;document.querySelector(".recipe");const b=async function(){try{let e=window.location.hash.slice(1);if(!e)return;h.renderSpinner(),await i(e),h.render(s.recipe),console.log("Receta OK:",s.recipe)}catch(e){throw console.error(`error durante la  carga : ${e}`),h.renderError(e.message),e}},w=async function(){try{let e=p.getQuery();if(!e)return;v.renderSpinner(),await n(e),v.render(a()),m.render(s.search),console.log(s.search.results)}catch(e){console.error(" Error en .controlSearchResults:",e)}};h.addHandlerRender(b),p.addHandlerSearch(w),m.addHandlerClick(function(e){v.render(a(e)),m.render(s.search)}),console.log("Controlador inicializado");
//# sourceMappingURL=OK.f96848f9.js.map
