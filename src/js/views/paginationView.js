
///////////////////////////////////////////////////////////////////////////////
// Archivo  paginationView   arquitectura MVC
// Este código define  la vista de paginación para que la aplicación web 
// muestre múltiples resultados en páginas 
//Mostrar los botones de paginación (anterior y siguiente).
// Detectar cuándo el usuario hace clic en un botón de paginación.
//Comunicarle al controlador (controller) qué página se debe cargar.
///////////////////////////////////////////////////////////////////////////////
import View from './view.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  //  Método privado _generateMarkup
  _generateMarkup() {
    // Página actual
    const curPage = this._data.page;

    // Total de páginas
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //  Caso a Página 1 y hay más páginas
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Casob Última página y hay más de una
    if (curPage === numPages && numPages > 1) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
    }

    // Casoc. Cualquier página del medio
    if (curPage < numPages) {
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>

        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Caso d: Solo una página
    return '';
  }


}

export default new PaginationView();
