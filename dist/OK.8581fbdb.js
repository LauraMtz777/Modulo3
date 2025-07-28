
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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
///////////////////////////////////////////////////////////////////////////////
// Archivo model.js  en  arquitectura MVC
// funcines  principales  
// Load  Recipe , se  usar para extraer  la  receta 
// LoadSearchResults. Carga de  resultado de la  busqueda 
// Crear un nuevo objeto formateado
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// config.js
// Se define la  URL de la API , Tiempos de Timeout enpeticiones y paginacion 
///////////////////////////////////////////////////////////////////////////////
const $949cefe0e606d775$export$923ea8233b386e99 = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
const $949cefe0e606d775$export$196440f71ed9f601 = 10; // Timeout para las peticiones
const $949cefe0e606d775$export$5feaddb1377b7f5e = 10; // paginas de hasta 10 resultados 


///////////////////////////////////////////////////////////////////////////////
// Archivo helpers.js  usado  para  funciones  de  interfaz MVC
// funcines  principales 
// a.-getJSON(id) Hace una petición HTTP a una URL (id).
// Usa Promise.race() para limitar el tiempo de espera (timeout).
// Convierte la respuesta en JSON.Lanza un error si la respuesta no es exitosa.
// b. Funcion para manejo de  timeout  y deteccion de tiempos largso de  respuesta en servidor 
///////////////////////////////////////////////////////////////////////////////

function $8655b94003061a8a$var$timeout(sec) {
    return new Promise((_, reject)=>setTimeout(()=>reject(new Error(`Request took too long! Timeout after ${sec} second(s)`)), sec * 1000));
}
async function $8655b94003061a8a$export$d047a7c56db64af4(id) {
    try {
        const fetchPro = fetch(id);
        const res = await Promise.race([
            fetchPro,
            $8655b94003061a8a$var$timeout((0, $949cefe0e606d775$export$196440f71ed9f601))
        ]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (err) {
        throw err;
    }
}


const $f821677b80d93c23$export$ca000e230c0caa3e = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: (0, $949cefe0e606d775$export$5feaddb1377b7f5e),
        bookmarks: []
    }
};
async function $f821677b80d93c23$export$b96725c7a035d60b(id) {
    try {
        const data = await (0, $8655b94003061a8a$export$d047a7c56db64af4)(`${(0, $949cefe0e606d775$export$923ea8233b386e99)}${id}`);
        if (!data?.data?.recipe) throw new Error('Receta invalida ');
        const { recipe: recipe } = data.data;
        const recipeFormatted = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            //julio 27  ingredients: recipe.ingredients,
            ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : []
        };
        //Se  asigna  la variable  formateada al estado 
        $f821677b80d93c23$export$ca000e230c0caa3e.recipe = recipeFormatted;
        console.log($f821677b80d93c23$export$ca000e230c0caa3e.recipe);
    } catch (err) {
        // ✅ Propagar el error al controlador
        throw err;
    }
}
async function $f821677b80d93c23$export$202b8e5cb363a0c4(query) {
    try {
        //  state.search.query = query;
        // ✅ Obtener datos desde la API
        const data = await (0, $8655b94003061a8a$export$d047a7c56db64af4)(`${(0, $949cefe0e606d775$export$923ea8233b386e99)}?search=${query}`);
        // ✅ Guardar el término de búsqueda
        if (!data?.data?.recipes || !Array.isArray(data.data.recipes)) throw new Error("Receta inv\xe1lida");
        // Guardar query en el estado
        $f821677b80d93c23$export$ca000e230c0caa3e.search.query = query;
        // ✅ Transformar y guardar los resultados
        $f821677b80d93c23$export$ca000e230c0caa3e.search.results = data.data.recipes.map((rec)=>{
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url
            };
        });
    } catch (err) {
        console.log(`${err} \u{1F4A5}\u{1F4A5}\u{1F4A5}\u{1F4A5}`);
        throw err;
    }
}
const $f821677b80d93c23$export$8d7f79465139ab72 = function(page = $f821677b80d93c23$export$ca000e230c0caa3e.search.page) {
    $f821677b80d93c23$export$ca000e230c0caa3e.search.page = page;
    const start = (page - 1) * $f821677b80d93c23$export$ca000e230c0caa3e.search.resultsPerPage;
    const end = page * $f821677b80d93c23$export$ca000e230c0caa3e.search.resultsPerPage;
    return $f821677b80d93c23$export$ca000e230c0caa3e.search.results.slice(start, end);
};



var $d0367fa1fc51ee10$exports = {};
$d0367fa1fc51ee10$exports = import.meta.resolve("5BOVG");


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

var $e7d84b30bb9cd8ce$exports = {};
// FRACTY CONVERTS DECIMAL NUMBERS TO FRACTIONS BY ASSUMING THAT TRAILING PATTERNS FROM 10^-2 CONTINUE TO REPEAT
// The assumption is based on the most standard numbering conventions
// e.g. 3.51 will convert to 3 51/100 while 3.511 will convert to 3 23/45
// Throw any number up to 16 digits long at fracty and let fracy do the work.
// If number is beyond 16 digits fracty will truncate at 15 digits to compensate for roundoff errors created in IEEE 754 Floating Point conversion.
$e7d84b30bb9cd8ce$exports = function(number) {
    let type;
    if (number < 0) {
        number = Math.abs(number);
        type = '-';
    } else type = '';
    if (number === undefined) return `Your input was undefined.`;
    if (isNaN(number)) return `"${number}" is not a number.`;
    if (number == 9999999999999999) return `${type}9999999999999999`;
    if (number > 9999999999999999) return `Too many digits in your integer to maintain IEEE 754 Floating Point conversion accuracy.`;
    if (Number.isInteger(number)) return `${type}${number}`;
    if (number < .000001) return '0';
    const numberString = number.toString();
    const entry = numberString.split('.');
    let integer = entry[0];
    let decimal;
    if (decimal == '0' && integer !== '0') return integer;
    else if (decimal == '0' && integer == '0') return '0';
    else if (numberString.length >= 17) decimal = entry[1].slice(0, entry[1].length - 1);
    else decimal = entry[1];
    if (decimal == '99' && integer !== '0') return `${integer} 99/100`;
    else if (decimal == '99' && integer == '0') return `99/100`;
    else if (1 - parseFloat(`.${decimal}`) < .0011) decimal = '999';
    if (decimal == undefined) return integer;
    const decimalRev = decimal.split('').reverse().join(''); //Reverse the string to look for patterns.
    const patternSearch = /^(\d+)\1{1,2}/; //This greedy regex matches the biggest pattern that starts at the beginning of the string (at the end, in the case of the reversed string). A lazy regex doesn't work because it only identifies subpatterns in cases where subpatterns exist (e.g. '88' in '388388388388'), thus pattern capture must be greedy.
    let pattern = decimalRev.match(patternSearch); //If there's a pattern, it's full sequence is in [0] of this array and the single unit is in [1] but it may still need to be reduced further.
    if (pattern && decimal.length > 2) {
        let patternSequence = pattern[0].split('').reverse().join('');
        let endPattern = pattern[1].split('').reverse().join('');
        if (endPattern.length > 1) {
            let endPatternArray = endPattern.split('');
            let testSingleUnit = 1;
            for(let i = 0; i < endPatternArray.length; i++)testSingleUnit /= endPatternArray[0] / endPatternArray[i];
            if (testSingleUnit === 1) endPattern = endPatternArray[0];
        }
        if (endPattern.length > 1 && endPattern.length % 2 === 0) endPattern = parseInt(endPattern.slice(0, endPattern.length / 2), 10) - parseInt(endPattern.slice(endPattern.length / 2, endPattern.length), 10) === 0 ? endPattern.slice(0, endPattern.length / 2) : endPattern;
        return $e7d84b30bb9cd8ce$var$yesRepeat(decimal, endPattern, patternSequence, integer, type); //Begin calculating the numerator and denominator for decimals that have a pattern.
    } else return $e7d84b30bb9cd8ce$var$noRepeat(decimal, integer, type); //Begin calculating the numerator and denominator for decimals that don't have a pattern.
};
//IF THERE'S A TRAILING PATTERN FRACTY DIVIDES THE INPUT BY ONE SUBTRACTED FROM THE NEAREST BASE 10 NUMBER WITH NUMBER OF ZEROS EQUAL TO THE LENGTH OF THE REPEATED PATTERN (I.E. A SERIES OF 9'S) MULTIPLIED BY THE BASE 10 NUMBER GREATER THAN AND CLOSEST TO THE INPUT.
function $e7d84b30bb9cd8ce$var$yesRepeat(decimal, endPattern, patternSequence, integer, type) {
    const rep = true; //The numerator repeats.
    const nonPatternLength = decimal.length - patternSequence.length >= 1 ? decimal.length - patternSequence.length : 1; //Does the length of the non pattern segment of the input = 0? If it does, that's incorrect since we know it must equal at least 1, otherwise it's the length of the decimal input minus the length of the full pattern.
    const decimalMultiplier2 = Math.pow(10, nonPatternLength); //Second multiplier to use.
    const float = parseFloat(`0.${decimal}`); //Convert the decimal input to a floating point number.
    const decimalMultiplier1 = Math.pow(10, endPattern.length); //Find the right multiplier to use for both numerator and denominator, which will later have 1 subtracted from it in the case of the denominator.
    const numerator = Math.round((float * decimalMultiplier1 - float) * Math.pow(10, nonPatternLength)); //Find the numerator to be used in calculating the fraction that contains a repeating trailing sequence.
    const denominator = (decimalMultiplier1 - 1) * decimalMultiplier2; //Caluculate the denominator using the equation for repeating trailing sequences.
    return $e7d84b30bb9cd8ce$var$reduce(numerator, denominator, integer, type, rep); //Further reduce the numerator and denominator.
}
//IF THERE'S NO TRAILING PATTERN FRACTY DIVIDES THE INPUT BY THE NEAREST BASE 10 INTEGER GREATER THAN THE NUMERATOR.
function $e7d84b30bb9cd8ce$var$noRepeat(decimal, integer, type) {
    const rep = false; //The numerator doesn't repeat.
    const numerator = parseInt(decimal, 10); //Numerator begins as decimal input converted into an integer.
    const denominator = Math.pow(10, decimal.length); //Denominator begins as 10 to the power of the length of the numerator.
    return $e7d84b30bb9cd8ce$var$reduce(numerator, denominator, integer, type, rep); //Reduce the numerator and denominator.
}
//FRACTY REDUCES THE FRACTION.
function $e7d84b30bb9cd8ce$var$reduce(numerator, denominator, integer, type, rep) {
    const primeNumberArray = [
        2,
        3,
        5
    ]; //If the numerator isn't from a repeating decimal case, the initialized array of prime numbers will suffice to find the common denominators.
    if (rep === true) {
        for(let i = 3; i * i <= numerator; i += 2)if (numerator % i === 0) primeNumberArray.push(i);
    }
    let j = 0; //Initialize counter over the prime number array for the while loop.
    let comDenom = 1; //Initialize the common denominator.
    let num = numerator; //Initialize the numerator.
    let den = denominator; //Initialize the denominator.
    while(j <= primeNumberArray.length)if (num % primeNumberArray[j] === 0 && den % primeNumberArray[j] === 0) {
        comDenom = comDenom * primeNumberArray[j];
        num = num / primeNumberArray[j];
        den = den / primeNumberArray[j];
    } else j++;
    return $e7d84b30bb9cd8ce$var$returnStrings(den, num, integer, type);
}
//FRACTY RETURNS THE REDUCED FRACTION AS A STRING.
function $e7d84b30bb9cd8ce$var$returnStrings(den, num, integer, type) {
    if (den === 1 && num === 1) {
        integer = `${type}${(parseInt(integer) + 1).toString()}`; //Add 1 to the integer and return a string without a fraction.
        return `${integer}`;
    } else if (num === 0) return `${type}${integer}`;
    else if (integer == '0') return `${type}${num}/${den}`;
    else return `${type}${integer} ${num}/${den}`; //If there's an integer and a fraction return both.
}


///////////////////////////////////////////////////////////////////////////////
// Archivo  vieww.js   arquitectura MVC   
// Contiene la  clase view Esta clase se encarga de renderizar contenido en el DOM, 
// como datos, mensajes, errores y spinners (indicadores de carga)
///////////////////////////////////////////////////////////////////////////////

class $66df3411d2d6676e$export$2e2bcd8739ae039 {
    _data;
    render(data) {
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    // Método para limpiar el contenido previo del elemento padre
    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderSpinner() {
        const markup = `
      <div class="spinner">
        <svg>
          <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-loader"></use>
        </svg>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this._errorMessage) {
        const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderMessage(message = this._message) {
        const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}


class $275bb41a244edeb7$var$RecipeView {
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
          <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-loader"></use>
        </svg>
      </div>
    `;
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
    addHandlerRender(handler) {
        [
            'hashchange',
            'load'
        ].forEach((ev)=>window.addEventListener(ev, handler));
    }
    renderError(message = this._errorMessage) {
        const _erroMessage = "We Could not find that recipe. Please try another oner!";
        const markup = `
<div class="error">
    <div>
         <svg>
              <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-alert-triangle"></use>
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
          <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-smile"></use>
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
        [
            "hashchange",
            "load"
        ].forEach((ev)=>window.addEventListener(ev, handler));
    }
    _clear() {
        this._parentElement.innerHTML = "";
    }
    //Genera el contenido HTML dinámicamente 
    _generateMarkup() {
        return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title"> <span>
          ${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">${this._data.ingredients.map((ing)=>{
            return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
                <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-check"></use>
              </svg>
            <div class="recipe__quantity">${ing.quantity ? (0, (/*@__PURE__*/$parcel$interopDefault($e7d84b30bb9cd8ce$exports)))(ing.quantity).toString() : ""}</div>
            <div class="recipe__description">
             <span class="recipe__unit">${ing.unit}</span>
             ${ing.description}
              </div>
            </li> `;
        }).join("")}
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
              <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    }
}
var $275bb41a244edeb7$export$2e2bcd8739ae039 = new $275bb41a244edeb7$var$RecipeView();


///////////////////////////////////////////////////////////////////////////////
// Archivo  searchView   arquitectura MVC. Este código define  la vista 
// se encarga de manejar la lógica de una búsqueda en la aplicacion WEB
///////////////////////////////////////////////////////////////////////////////
class $cc3ccfe7a9f0c093$var$SearchView {
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
        this._parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        });
    }
}
var $cc3ccfe7a9f0c093$export$2e2bcd8739ae039 = new $cc3ccfe7a9f0c093$var$SearchView();


////////////////////////////////////////////////////////////////////////////////////////////
// Archivo  ResultView  arquitectura MVC ,Perteneciente  a la  Vista 
// que se encarga de mostrar una receta completa en la pagina web 
/////////////////////////////////////////////////////////////////////////////////////////////

class $34f8e1938a5b3048$var$ResultsView extends (0, $66df3411d2d6676e$export$2e2bcd8739ae039) {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query. Please try again!';
    _message = '';
    _generateMarkup() {
        if (!this._data || this._data.length === 0) return this.renderError(this._errorMessage);
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
} // termina la clase ResultsView
var $34f8e1938a5b3048$export$2e2bcd8739ae039 = new $34f8e1938a5b3048$var$ResultsView();


///////////////////////////////////////////////////////////////////////////////
// Archivo  paginationView   arquitectura MVC
// Este código define  la vista de paginación para que la aplicación web 
// muestre múltiples resultados en páginas 
//Mostrar los botones de paginación (anterior y siguiente).
// Detectar cuándo el usuario hace clic en un botón de paginación.
//Comunicarle al controlador (controller) qué página se debe cargar.
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Archivo  vieww.js   arquitectura MVC   
// Contiene la  clase view Esta clase se encarga de renderizar contenido en el DOM, 
// como datos, mensajes, errores y spinners (indicadores de carga)
///////////////////////////////////////////////////////////////////////////////

class $39aeb40ef9a540e0$export$2e2bcd8739ae039 {
    _data;
    render(data) {
        if (!data || Array.isArray(data) && data.length === 0) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    // Método para limpiar el contenido previo del elemento padre
    _clear() {
        this._parentElement.innerHTML = '';
    }
    renderSpinner() {
        const markup = `
      <div class="spinner">
        <svg>
          <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-loader"></use>
        </svg>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this._errorMessage) {
        const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderMessage(message = this._message) {
        const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${(0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports)))}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
}



class $ea55b24677fb9333$var$PaginationView extends (0, $39aeb40ef9a540e0$export$2e2bcd8739ae039) {
    _parentElement = document.querySelector('.pagination');
    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
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
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //  Caso a Página 1 y hay más páginas
        if (curPage === 1 && numPages > 1) return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
        // Casob Última página y hay más de una
        if (curPage === numPages && numPages > 1) return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
        // Casoc. Cualquier página del medio
        if (curPage < numPages) return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>

        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${0, (/*@__PURE__*/$parcel$interopDefault($d0367fa1fc51ee10$exports))}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
        // Caso d: Solo una página
        return '';
    }
}
var $ea55b24677fb9333$export$2e2bcd8739ae039 = new $ea55b24677fb9333$var$PaginationView();


const $51e55805949f51d8$var$recipeContainer = document.querySelector('.recipe');
//controlRecipes funcion asincrona
//a traves del un ID de la receta desde la URL.
//mediante la porpiedad window.location.hash devuelve una URL  con un # al inicio 
//slice(1) elimina el # y deja solo la URL  .
//se detaectan errores  con al estructura  try y  catch 
const $51e55805949f51d8$var$controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        (0, $275bb41a244edeb7$export$2e2bcd8739ae039).renderSpinner(); //
        await $f821677b80d93c23$export$b96725c7a035d60b(id);
        (0, $275bb41a244edeb7$export$2e2bcd8739ae039).render($f821677b80d93c23$export$ca000e230c0caa3e.recipe);
        console.log('Receta OK:', $f821677b80d93c23$export$ca000e230c0caa3e.recipe);
    } catch (err) {
        console.error(`error durante la  carga : ${err}`);
        (0, $275bb41a244edeb7$export$2e2bcd8739ae039).renderError(err.message);
        throw err;
    }
};
//controlSearchResults funcion asincrona
// a traves de control try.. catch  para manejar errores si algo falla durante
// la búsqueda (como un problema de red).
//slice(1) elimina el # y deja solo la URL  .
//se detactan errores  con al estructura  try y  catch 
const $51e55805949f51d8$var$controlSearchResults = async function() {
    try {
        const query = (0, $cc3ccfe7a9f0c093$export$2e2bcd8739ae039).getQuery();
        if (!query) return;
        (0, $34f8e1938a5b3048$export$2e2bcd8739ae039).renderSpinner();
        await $f821677b80d93c23$export$202b8e5cb363a0c4(query);
        (0, $34f8e1938a5b3048$export$2e2bcd8739ae039).render((0, $f821677b80d93c23$export$8d7f79465139ab72)());
        (0, $ea55b24677fb9333$export$2e2bcd8739ae039).render($f821677b80d93c23$export$ca000e230c0caa3e.search);
        console.log($f821677b80d93c23$export$ca000e230c0caa3e.search.results); // Muestra los resultados en consola
    } catch (err) {
        console.error(' Error en .controlSearchResults:', err);
    }
}; // termina función controlSearchResults
//controlcontrolPagination 
//  típico en aplicaciones web 
// que tienen paginación, como una app de recetas, productos, 
// o cualquier lista larga dividida por páginas.
const $51e55805949f51d8$var$controlPagination = function(goToPage) {
    // 1. Mostrar los nuevos resultados
    (0, $34f8e1938a5b3048$export$2e2bcd8739ae039).render($f821677b80d93c23$export$8d7f79465139ab72(goToPage));
    // 2. Mostrar los nuevos botones de paginación
    (0, $ea55b24677fb9333$export$2e2bcd8739ae039).render($f821677b80d93c23$export$ca000e230c0caa3e.search);
};
// Funcion de incializacion 
//  configura los controladores de eventos de la aplicación web 
const $51e55805949f51d8$var$init = function() {
    (0, $275bb41a244edeb7$export$2e2bcd8739ae039).addHandlerRender($51e55805949f51d8$var$controlRecipes);
    (0, $cc3ccfe7a9f0c093$export$2e2bcd8739ae039).addHandlerSearch($51e55805949f51d8$var$controlSearchResults);
    (0, $ea55b24677fb9333$export$2e2bcd8739ae039).addHandlerClick($51e55805949f51d8$var$controlPagination);
    console.log('Controlador inicializado');
};
$51e55805949f51d8$var$init();


//# sourceMappingURL=OK.8581fbdb.js.map
