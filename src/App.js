import React, { Component } from 'react';

import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchTerm : '',
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(e){
    this.setState({searchTerm: e.target.value});
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id; 
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list:updatedList});
  }

  render() {
    const hellowWorld = 'Welcome to the road to learn React';
    const {searchTerm,list} = this.state;
    return (      
      <div className = 'page'>
        <div className = 'interactions'>
          <Search
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
            Search
          </Search>
        </div>

        <Table
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss} 
        />
      </div>
    ); //return
  }
}

const Search = ({value, onChange,children}) => 
  <form>
    {children}
  <input type = 'text' 
    value = {value}
    onChange = {onChange}  
  />
  </form>

class Table extends Component{
  render(){
    const {list,pattern,onDismiss} = this.props;   
    return(
      <div className = 'table'>
        {list.filter(isSearched(pattern)).map(item =>
          <div key = {item.objectID} className = 'table-row'>
            <span>
              <a href = {item.url}> {item.title} </a>
            </span>            
            <span> {item.author} </span>
            <span> {item.num_comments} </span>            
            <span> {item.points} </span> 
            <Button onClick={()=>onDismiss(item.objectID)} types = 'button' className = 'button-inline'>
              Dismiss
            </Button>
          </div>
        )} 
      </div>
    )
  }
}

const Button = ({ onClick, className = '', children }) =>
      <button onClick = {onClick}
      className = {className}
      type = 'button'>
        {children}
      </button>
  

export default App;
