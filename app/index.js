import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from 'semantic-ui-react'
import apiHelpers from '../utils/apiHelpers';




class ProductRow extends React.Component{
  render(){
    return(
      <li>
        {this.props.name} | {this.props.price}
      </li>
    )
  }
}
class ProductTable extends React.Component{
  render(){
    var rows = [];
  //  console.log(this.props.products);
    this.props.products.map(function(object, i){
            if(object.name.indexOf(this.props.filterText) != -1){
              rows.push(<ProductRow name={object.name} price={object.price} key={i} />);
            }
        }.bind(this))
    return(
      <ul>
        {rows}
      </ul>
    )
  }
}

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(){
    this.props.onUserInput(
      this.filterTextInput.value
    )
  }
  render(){
    return(
      <form>
        <input type="text" placeholder="Search..."
          value={this.props.filterText}
          ref={(input)=>this.filterTextInput = input}
          onChange={this.handleChange} />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
        <Dropdown text='File'>
    <Dropdown.Menu>
      <Dropdown.Item text='New' />
      <Dropdown.Item text='Open...' description='ctrl + o' />
      <Dropdown.Item text='Save as...' description='ctrl + s' />
      <Dropdown.Item text='Rename' description='ctrl + r' />
      <Dropdown.Item text='Make a copy' />
      <Dropdown.Item icon='folder' text='Move to folder' />
      <Dropdown.Item icon='trash' text='Move to trash' />
      <Dropdown.Divider />
      <Dropdown.Item text='Download As...' />
      <Dropdown.Item text='Publish To Web' />
      {/* item text can also be defined as children */}
      <Dropdown.Item>E-mail Collaborators</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
      </form>
    )
  }
}
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      products: []
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }
  componentDidMount() {
    apiHelpers.getTableData().then(function (response) {
      this.setState({
        products: response.data
      })
    }.bind(this))

  }
  handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

ReactDOM.render(<FilterableProductTable />, document.getElementById('app'));
