

////////////////////////////////////////////////////////////////////////////////////////////
// Archivo  ResultView  arquitectura MVC ,Perteneciente  a la  Vista 
// que se encarga de mostrar una receta completa en la pagina web 
/////////////////////////////////////////////////////////////////////////////////////////////

import View from './view.js';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';
  _generateMarkup() {
    if (!this._data || this._data.length === 0) {
      return this.renderError(this._errorMessage)};
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated"></div>
          </div>
        </a>
      </li>`;
  }
}// termina la clase ResultsView

export default new ResultsView();