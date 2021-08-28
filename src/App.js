import './App.css';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filterByValue, loadData} from './store';

class App extends Component {
  componentDidMount() {
    //loadData returns an object used by dispatch as the action
    //{count: 20} is our payload
    this.props.dispatch(loadData({count: 20}));
}
filterByInput(e){
    let input = e.target.value;
    this.props.dispatch(filterByValue({value: input}))
}  
 render(){
    let products = this.props.state.filteredProducts;
  return (
     <div className="App">
       <section className="hero">
          <h1 className="title">Pagination,Filter, Sort</h1>
       </section> 
      <div className="select">
          <select>
              <option >Sort by</option>
              <option>Price - Lowest to Highest</option>
              <option>Price - Highest to Lowest</option>
              <option>Alphabet - A-Z</option>
              <option>Alphabet - Z-A</option>
          </select>
      </div>
      <div className='control' >
        <input onChange={e=> {
            //call this method on every change in input
            this.filterByInput(e);
        }}  placeholder='Filter by' type='text'/>
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
