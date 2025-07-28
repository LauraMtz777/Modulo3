

///////////////////////////////////////////////////////////////////////////////
// ARCHIVO controller js
// Al usar  una  arcquitectura MVC  en el cual el controlador 
// esta encargado de pasar la informacion entre el modelo y  la  vista 
// se  tiene como  funciones principales  
// controlRecipes
// ControlSearchResults
// controlPagination
// Inicializacion 
///////////////////////////////////////////////////////////////////////////////

import * as model from './model.js';
import { API_URL, TIMEOUT_SEC } from './config.js'; // Importando las constantes  URL y timeout
import { loadSearchResults,getSearchResultsPage}  from './model.js';
import  icons  from 'url:../img/icons.svg'; // Importando los iconos SVG

import recipeView from './views/RecipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');

//controlRecipes funcion asincrona
//a traves del un ID de la receta desde la URL.
//mediante la porpiedad window.location.hash devuelve una URL  con un # al inicio 
//slice(1) elimina el # y deja solo la URL  .
//se detaectan errores  con al estructura  try y  catch 

const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1); 
    if (!id) {return;} 
    recipeView.renderSpinner();  //
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    console.log('Receta OK:', model.state.recipe);
  } catch (err) {
    console.error(`error durante la  carga : ${err}`);
    recipeView.renderError(err.message);
    throw err; 
  }
}
//controlSearchResults funcion asincrona
// a traves de control try.. catch  para manejar errores si algo falla durante
// la búsqueda (como un problema de red).
//slice(1) elimina el # y deja solo la URL  .
//se detactan errores  con al estructura  try y  catch 
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    resultsView.render(getSearchResultsPage());
    paginationView.render(model.state.search);
    console.log(model.state.search.results); // Muestra los resultados en consola
  } catch (err) {
    console.error(' Error en .controlSearchResults:', err);
  }
};// termina función controlSearchResults

//controlcontrolPagination 
//  típico en aplicaciones web 
// que tienen paginación, como una app de recetas, productos, 
// o cualquier lista larga dividida por páginas.

const controlPagination = function (goToPage) {
  // 1. Mostrar los nuevos resultados
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2. Mostrar los nuevos botones de paginación
  paginationView.render(model.state.search);
};

// Funcion de incializacion 
//  configura los controladores de eventos de la aplicación web 
const init = function() {
  recipeView.addHandlerRender(controlRecipes); 
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  console.log('Controlador inicializado');

}
init(); 