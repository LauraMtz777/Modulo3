///////////////////////////////////////////////////////////////////////////////
// Archivo model.js  en  arquitectura MVC
// funcines  principales  
// Load  Recipe , se  usar para extraer  la  receta 
// LoadSearchResults. Carga de  resultado de la  busqueda 
// Crear un nuevo objeto formateado
///////////////////////////////////////////////////////////////////////////////

import { API_URL,RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

//Objeto de  estado 
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    bookmarks: [],
  },
};

//Load  Recipe , se  usar para extraer  la  receta 
export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

   if (!data?.data?.recipe) {
            throw new Error('Receta invalida ');
    }
    const { recipe } = data.data;

      const recipeFormatted = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
     //julio 27  ingredients: recipe.ingredients,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    };
    //Se  asigna  la variable  formateada al estado 
    state.recipe=recipeFormatted;
    console.log(state.recipe);
  } catch (err) {
    // ✅ Propagar el error al controlador
    throw err;
  }
  };

export async function loadSearchResults(query){
  try {
  //  state.search.query = query;
    // ✅ Obtener datos desde la API
    const data = await getJSON(`${API_URL}?search=${query}`);
    // ✅ Guardar el término de búsqueda
    if (!data?.data?.recipes || !Array.isArray(data.data.recipes)) {
            throw new Error('Receta inválida');
    }
        // Guardar query en el estado
      state.search.query = query;
    // ✅ Transformar y guardar los resultados
     state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
    throw err;
  }
};
///
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};