
////////////////////////////////////////////////////////////////////////////////////////////
// Archivo  RecipeView  arquitectura MVC ,Perteneciente  a la  Vista 
// que se encarga de mostrar una receta completa en la interfaz de usuario de la  aplicación web. 
// Elementos principales 
// clase  RecipeView contiene 
// ParentElement: el contenedor HTML donde se insertará la receta.
// data: los datos de la receta (imagen, ingredientes, etc.).
// Método render(data). Guarda los datos de la receta,Genera el HTML con _generateMarkup().,
// Limpia el contenido anterior,Inserta el nuevo HTML en el DOM....
/////////////////////////////////////////////////////////////////////////////////////////////

import icons from 'url:../../img/icons.svg'; // Usar parcel u otra herramienta para íconos SVG
import fracty from 'fracty';
import View from "./view.js";

class RecipeView {
  _parentElement = document.querySelector(".recipe");
  _data;
  _errorMessage = "no tecenmos esa  receta !";
  _message = "Encontramos su receta !";

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  //Todo el contenido se carga y genera en el navegador del usuario.
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, handler)
    );
  }

  renderError(message = this._errorMessage) {
    const _erroMessage = "We Could not find that recipe. Please try another oner!";

    const markup = `
<div class="error">
    <div>
         <svg>
              <use href="${icons}#icon-alert-triangle"></use>
        </svg>
   </div>
  <p>${message}</p>
  </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const _erroMessage = "We Could not find that recipe. Please try another oner!";
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // Ejecutar controlRecipes cuando cambia el hash o se carga la página
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
   //Genera el contenido HTML dinámicamente 
  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title
      }" class="recipe__img" />
          <h1 class="recipe__title"> <span>
          ${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">${this._data.ingredients
        .map((ing) => {
          return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
            <div class="recipe__quantity">${ing.quantity ? fracty(ing.quantity).toString() : ""
            }</div>
            <div class="recipe__description">
             <span class="recipe__unit">${ing.unit}</span>
             ${ing.description}
              </div>
            </li> `;
        })
        .join("")}
            </ul>
            </div>

        
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher
      }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }
}

export default new RecipeView();
