
import generate from "../helpers/data";
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



const initialState = {
    appliedFilters: []
};
const filterStore = (state = initialState, action) => {
    switch(action.type){
        case SORT_BY_ALPHABET :
            return state;
        case SORT_BY_PRICE :
            return state;
        case FILTER_BY_PRICE :
            return state;
        case LOAD_DATA :
            let count  = action.payload.count;
            let products = generate(count);
            return {
                ...state,
                products
            };
        case FILTER_BY_VALUE :
            let newState = Object.assign({},state);
            let value = action.payload.value;
            let filterValues = state.products.filter(product => {
                return product.name.toLowerCase().includes(value) ||
                product.designer.toLowerCase().includes(value);

            }); 
            
            let appliedFilters = state.appliedFilters;
            if(value){
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                if(index === -1)
                    appliedFilters.push(FILTER_BY_VALUE);
                newState.filterProducts = filterValues;
            }else{
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                appliedFilters.splice(index,1);
                if(appliedFilters.length === 0){
                    newState.filterProducts = newState.products;
                }
            }
            return newState;
            /*
            return {
                ...state,
                products: filterValues,
            };
            */
            
        default :
            return state;
    }
};
export default filterStore;