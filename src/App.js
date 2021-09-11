import './App.css';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filterByValue, loadData, sortByAlphabet, sortByPrice} from './store';

class App extends Component {
  componentDidMount() {
    //loadData returns an object used by dispatch as the action
    //{count: 20}  our payload
    this.props.dispatch(loadData({count: 20}));
}
filterByInput(e){
    let input = e.target.value;
    this.props.dispatch(filterByValue({value: input}))
}
sortByInput(e){
    let value = e.target.value;
    let direction = value.endsWith('asc') ? "asc" : "desc";

    if (value.startsWith('price')){
        this.props.dispatch(sortByPrice({direction}))
    }else {
        this.props.dispatch(sortByAlphabet({direction}));
    }
}  
 render(){
   let products = this.props.state.filteredProducts;
   console.log(products);
  return (
     <div className="App">
       <section className="hero">
          <h1 className="title">Pagination,Filter, Sort</h1>
       </section> 
       <div className="control">
        <div className="select">
            <select onChange={e => {
                this.sortByInput(e)
            }}>
                <option>Sort by</option>

                <option value='alphabet_asc'>Name - A-Z</option>
                <option value='alphabet_desc'>Name - Z-A</option>

                <option value='price_asc'>Price - Lowest to Highest</option>
                <option value='price_desc'>Price - Highest to Lowest</option>

            </select>
        </div>
        </div>
      <div className='control' >
        <input onChange={e=> {
            //call this method on every change in input
            this.filterByInput(e);
        }}  placeholder='Start Browsing .. !!' type='text'/>
      </div>
      <div className='tile is-ancestor' style={{flexWrap: "wrap"}}>
                           {
                                 products && products.length && products.map(product => (
                                   <div className='tile is-parent is-3' >
                                       <div className='tile is-child box'>
                                           <p>
                                               <b>Name: </b>
                                               {product.name}
                                           </p>
                                           <p>
                                               <b>Designer: </b>
                                               {product.designer}
                                           </p>
                                           <p>
                                               <b>Type: </b>
                                               {product.type}
                                           </p>
                                           <p>
                                               <b>Price: </b>
                                               {product.price}
                                           </p>
                                       </div>
                                   </div>
                               ))
                           }
                       </div>
     </div>
    );
 }
}

function mapStateToProps(state) {
  return {state};
}

export default connect(mapStateToProps)(App);
