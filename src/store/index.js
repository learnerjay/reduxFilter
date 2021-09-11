
import generate from "../helpers/data";
const initialState = {
    appliedFilters: []
};

const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
export const sortByPrice = payload => ({
    type : SORT_BY_PRICE,
    payload
});
export const filterByPrice = payload => ({
    type : FILTER_BY_PRICE,
    payload
});

export const filterByValue = payload => ({
    type: FILTER_BY_VALUE,
    payload
});

export const sortByAlphabet = payload => ({
    type : SORT_BY_ALPHABET,
    payload
});
export const loadData = payload => ({
    type : LOAD_DATA,
    payload
});

const filterStore = (state = initialState, action) => {
    switch(action.type){
        case SORT_BY_ALPHABET:
            let sortedArr = action.payload.direction === "asc" ?
                sortAsc(state.filteredProducts, 'name') :
                sortDesc(state.filteredProducts, 'name');
            
            return {
                ...state,
                filteredProducts: sortedArr
            };
        case SORT_BY_PRICE :
            let sortedArr2 = action.payload.direction === "asc" ?
                sortAsc(state.filteredProducts, 'price') :
                sortDesc(state.filteredProducts, 'price');

            return {
                ...state,
                filteredProducts: sortedArr2
            };
        case FILTER_BY_PRICE :
            return state;
        case LOAD_DATA :
            let count  = action.payload.count;
            let products = generate(count);
            return {
                ...state,
                products
            };
                
            case FILTER_BY_VALUE:
               
               let newState = Object.assign({}, state);
               let value = action.payload.value;
               let filteredValues = state.products.filter(product => {
                   return product.name.toLowerCase().includes(value) ||
                       product.designer.toLowerCase().includes(value);
               });
             
               let appliedFilters = state.appliedFilters;
               if (value) {
                   let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                   if (index===-1)
                       appliedFilters.push(FILTER_BY_VALUE);
                   //change the filtered products to reflect the change
                   newState.filteredProducts = filteredValues;
               } else {
                   let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                   appliedFilters.splice(index, 1);
                   if (appliedFilters.length === 0) {
                       newState.filteredProducts = newState.products;
                   }
               }
               return newState;
                   
        
            default :
            return state;
        
    }
};
export default filterStore;
function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return 1;

        if (b[field]> a[field]) return -1;

        return 0;
    })
}

function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) return -1;

        if (b[field]> a[field]) return 1;

        return 0;
    })
}