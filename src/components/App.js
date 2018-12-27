import React, { Component } from 'react';
import './App.css';
import { getCountries } from '../utils/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countries: [],
      options: [],
      open: false,
      openModal: false,
      selected: ""
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    getCountries().then(res => {
      this.setState({
        countries: res
      });
    })
  }

  handleChange = (evt) => {
    let options = [];
    this.state.countries.map(item => {
      if (item.name.toLowerCase().indexOf(evt.target.value.toLowerCase()) > -1) {
        options.push(item)
      }
    });
    this.setState({options: options})

    let open = !!evt.target.value;
    this.setState({
      open: open
    });
  };

  handleHeadClick = (e) => {
    return e.target.tagName == "HEADER" ? (
      this.setState({
        open: false
      })
    ) : ""
  };

  handleCountryClick = (e) => {
    e.preventDefault();
    this.setState({
      openModal: true,
      selected: e.target.innerHTML,
    });
  };

  handleClose = () => {
    this.setState({
      openModal: false
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header" onClick={this.handleHeadClick}>
          <div style={{height: "50px"}}>
            <input
              className="input"
              type="text"
              placeholder='Type to search country'
              onChange={this.handleChange}
            />
            {this.state.open && (
              <div className="container">
                <ul>
                  {!!this.state.options.length && (
                    this.state.options.map(item => {
                      return (<li key={item.name}><a href="#" onClick={this.handleCountryClick}>{item.name}</a></li>)
                    })
                  )}
              </ul>
              </div>
            )}
            {this.state.openModal && (
              <div id="myModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={this.handleClose}>&times;</span>
                  <p>Wellcome to {this.state.selected}</p>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
