


///////////////////////////////////////////////////////////////////////////////
// Archivo  searchView   arquitectura MVC. Este código define  la vista 
// se encarga de manejar la lógica de una búsqueda en la aplicacion WEB
///////////////////////////////////////////////////////////////////////////////
class SearchView {
  //Busca y guarda una referencia al elemento HTML con la clase .search, que normalmente es un
  _parentEl = document.querySelector('.search');
//Obtiene el valor que el usuario escribió en el campo de búsqueda (.search__field).
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  //uego limpia el campo de búsqueda con _clearInput()
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
//Devuelve el valor (query) al controlador.
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();