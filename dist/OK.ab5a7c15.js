function e(e){return e&&e.__esModule?e.default:e}const r="https://forkify-api.herokuapp.com/api/v2/recipes/";async function t(e){try{let r=fetch(e),t=await Promise.race([r,s(5)]),a=await t.json();if(!t.ok)throw Error(`${a.message} (${t.status})`);return a}catch(e){throw e}}const s=function(e){return new Promise(function(r,t){setTimeout(function(){t(Error(`Request took too long! Timeout after ${e} second`))},1e3*e)})};class a{constructor(e,r){if(r)this.numerator=e,this.denominator=r;else{let r="number"==typeof e?e:parseFloat(e),t=1,s=0,a=0,i=1,n=r;do{let e=Math.floor(n),r=t;t=e*t+s,s=r,r=a,a=e*a+i,i=r,n=1/(n-e)}while(Math.abs(r-t/a)>1e-6*r)this.numerator=t,this.denominator=a}}toString(){return 1===this.denominator?`${this.numerator}`:`${this.numerator}/${this.denominator}`}valueOf(){return this.numerator/this.denominator}}const i={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10}};async function n(e){try{let s=await t(`${r}${e}`);if(console.log("Datos de la receta:",s),!s?.data?.recipe)throw Error("Estructura de datos invalida");let{recipe:a}=s.data;i.recipe={id:a.id,title:a.title,publisher:a.publisher,sourceUrl:a.source_url,image:a.image_url,servings:a.servings,cookTime:a.cooking_time,ingredients:Array.isArray(a.ingredients)?a.ingredients:[]},console.log("Objeto Recipe cargado:",i.recipe)}catch(e){throw e}}async function c(e){try{let s=await t(`${r}?search=${e}`);if(console.log("Resultados de la búsqueda:",s),!s?.data?.recipes||!Array.isArray(s.data.recipes))throw Error("Estructura de datos inválida");i.search.query=e,i.search.results=s.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url})),console.log("Resultados de busqueda guardados:",`${i.search.results}`)}catch(e){throw console.log(`${e} \u{1F4A5}\u{1F4A5}\u{1F4A5}\u{1F4A5}`),e}}const o=function(e=i.search.page){i.search.page=e;let r=(e-1)*i.search.resultsPerPage,t=e*i.search.resultsPerPage;return i.search.results.slice(r,t)};var l={};l=import.meta.resolve("eyyUD");class d{_data;render(e){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let r=`
      <div class="spinner">
        <svg>
          <use href="${e(l)}#icon-loader"></use>
        </svg>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderError(r=this._errorMessage){let t=`
      <div class="error">
        <div>
          <svg>
            <use href="${e(l)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(r=this._message){let t=`
      <div class="message">
        <div>
          <svg>
            <use href="${e(l)}#icon-smile"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}class u extends d{_parentElement=document.querySelector(".recipe");_data;_errorMessage="We could not find that recipe. Please try another one!";_message="Recipe loaded successfully!";render(e){if(!e||"object"!=typeof e)return this.renderError();this._data=e;let r=this._generateMarkup();this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderSpinner(){let r=`
      <div class="spinner">
        <svg>
          <use href="${e(l)}#icon-loader"></use>
        </svg>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}renderError(r=this._errorMessage){r||(r=this._errorMessage);let t=`
      <div class="error">
        <div>
          <svg>
            <use href="${e(l)}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(r=this._message){r||(r=this._message);let t=`
      <div class="error">
        <div>
          <svg>
            <use href="${e(l)}#icon-smile"></use>
          </svg>
        </div>
        <p>${r}</p>
      </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}addHandlerRender(e){["hashchange","load"].forEach(r=>window.addEventListener(r,e))}_clear(){this._parentElement.innerHTML=""}_generateMarkup(){return this._data.ingredients&&Array.isArray(this._data.ingredients)?`
    <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
        <h1 class="recipe__title"><span>${this._data.title}</span></h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${e(l)}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookTime}</span>
        <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="${e(l)}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
        <span class="recipe__info-text">servings</span>
        </div>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map(this._generateIngredientMarkup).join("")}
        </ul>
    </div>

    <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
        This recipe was designed by
        <span class="recipe__publisher">${this._data.publisher}</span>. Check it out!
        </p>
        <a class="btn--small recipe__btn" href="${this._data.sourceUrl}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="${e(l)}#icon-arrow-right"></use>   
        </svg>
        </a>    
    </div>
  `:this.renderError("Ingredientes no disponibles")}_generateIngredientMarkup(r){return`
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${e(l)}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">
          ${r.quantity?new a(r.quantity).toString():""}
        </div>
        <div class="recipe__description">
          <span class="recipe__unit">${r.unit||""}</span>
          ${r.description}
        </div>
      </li>
    `}_formatQuantity(e){try{return new a(e).toString()}catch(r){return e}}}var _=new u;class h{_parentEl=document.querySelector(".search");getQuery(){let e=this._parentEl.querySelector(".search__field").value;return this._clearInput(),e}_clearInput(){this._parentEl.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentEl.addEventListener("submit",function(r){r.preventDefault(),e()})}}var p=new h;class g extends d{_parentElement=document.querySelector(".results");_errorMessage="No recipes found for your query. Please try again!";_message="";_generateMarkup(){return this._data&&0!==this._data.length?this._data.map(this._generateMarkupPreview).join(""):this.renderError(this._errorMessage)}_generateMarkupPreview(e){return`
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
      </li>`}}var v=new g;class f extends d{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(r){let t=r.target.closest(".btn--inline");if(!t)return;let s=+t.dataset.goto;console.log("GotoPage",`${s}`),e(s)})}_generateMarkup(){let r=this._data.page,t=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===r&&t>1?`
        <button data-goto="${r+1}" class="btn--inline pagination__btn--next">
          <span>Page ${r+1}</span>
          <svg class="search__icon">
            <use href="${e(l)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:r===t&&t>1?`
        <button data-goto="${r-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${e(l)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${r-1}</span>
        </button>
      `:r<t?`
        <button data-goto="${r-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${e(l)}#icon-arrow-left"></use>
          </svg>
          <span>Page ${r-1}</span>
        </button>
        <button data-goto="${r+1}" class="btn--inline pagination__btn--next">
          <span>Page ${r+1}</span>
          <svg class="search__icon">
            <use href="${e(l)}#icon-arrow-right"></use>
          </svg>
        </button>
      `:""}}var m=new f;document.querySelector(".recipe");const $=async function(){try{let e=window.location.hash.slice(1);if(!e)return;_.renderSpinner(),await n(e),_.render(i.recipe),console.log("Receta cargada:",i.recipe)}catch(e){throw console.error(`Error al cargar la receta: ${e}`),_.renderError(e.message),e}},b=async function(){try{let e=p.getQuery();if(!e)return;v.renderSpinner(),await c(e),v.render(o()),m.render(i.search),console.log(i.search.results)}catch(e){console.error("❌ Error en controlSearchResults:",e)}};_.addHandlerRender($),p.addHandlerSearch(b),m.addHandlerClick(function(e){v.render(o(e)),m.render(i.search)}),console.log("Controlador inicializado");
//# sourceMappingURL=OK.ab5a7c15.js.map
