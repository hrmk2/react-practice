import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

class ColorsAppContainer extends Component {
  constructor(){
    super();
    this.state={
      colors: []
    };
  }

  componentDidMount(){
    fetch('./colors.json')
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({colors: responseData});
        })
        .catch((error) => {
          console.log('Error fetching and parsing data', error);
        });
  }

  render(){
    return (
        <ColorsApp colors={this.state.colors} />
    );
  }
}

// 주 컴포넌트(상태 저장)
// SearchBar와 ColorList를 렌더링하고, filterText 상태와 handleUserInput 콜백을 속성을 통해 전달한다.
class ColorsApp extends Component {
  constructor(){
    super();
    this.state={
      filterText: ''
    };
  }

  handleUserInput(searchTerm){
    this.setState({filterText:searchTerm})
  }

  render(){
    return(
        <div>
          <SearchBar filterText = {this.state.filterText}
                     onUserInput = {this.handleUserInput.bind(this)} />
          <ColorList colors = {this.props.colors}
                       filterText = {this.state.filterText}/>
        </div>
    )
  }
}
ColorsApp.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object)
}

// 부모에서 속성을 통해 filterText(문자열)와 onUserInput(콜백함수)을 받는 순수 컴포넌트
class SearchBar extends Component {
  handleChange(event){
    this.props.onUserInput(event.target.value)
  }

  render(){
    return <input type="search"
                  placeholder="search"
                  value={this.props.filterText}
                  onChange={this.handleChange.bind(this)} />
  }
}
SearchBar.propTypes = {
  onUserInput: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired
}

// 속성을 통해 colors와 filterText를 받는 순수 컴포넌트이며, 색깔을 필터링한 후 이를 표시하는 역할을 한다.
// 순수 컴포넌트라고 하는 이유는 동일한 colors와 filterText 속성을 전달하면 동일한 내용을 표시하기 때문이다.
class ColorList extends Component {
  render(){
    let filteredColors = this.props.colors.filter(
        (color) => color.color.indexOf(this.props.filterText) !== -1
    );
    return(
        <ul>
          {filteredColors.map(
              (color) => <ColorItem key={color.color}
                                        color={color.color}
                                        value={color.value} />
          )}
        </ul>
    )
  }
}

ColorList.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  filterText: PropTypes.string.isRequired
}

class ColorItem extends Component {
  render() {
    return <li>{this.props.color} - {this.props.value}</li>
  }
}
ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

render(<ColorsAppContainer />, document.getElementById('root'));
