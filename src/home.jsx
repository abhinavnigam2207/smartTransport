import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import { fetchResource } from './httpCall';
import "./styles/App.css";

import {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng
} from 'react-places-autocomplete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      selected: false,
      allStops: [],
      nearest: []
    };
  }
  
  componentDidMount() {
    fetchResource('stopDetails').then((allStops)=> {
      this.setState({
        allStops
      })
    })
  }

  handleChange = address => {
    this.setState({ 
      address,
      selected: false
    });
  };
  
  checkFromList = (latLong) => {
    let distances = [];
    this.state.allStops.forEach(node => {
      let abc = node;
      abc.difference = Math.abs(node.Latitude-latLong.lat) + Math.abs(node.Longitude-latLong.lng);
      distances.push(abc);
    });
    
    const sortedData = this.state.allStops.sort(function(a,b) {return (a.difference > b.difference) ? 1 : ((b.difference > a.difference) ? -1 : 0);} );
    const resp = [
      sortedData[0],
      sortedData[1],
      sortedData[2]
    ];
    this.setState({
      nearest:resp 
    })
  }
  
  handleSelect = address => {  
    this.setState({ 
      address,
      selected: true
    });
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      this.checkFromList('', latLng);
    })
    .catch(error => console.error('Error', error));
  };
  
  renderAutocomplete = ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
    return (
      <div> 
        <input
        {...getInputProps({
          placeholder: 'Enter your location...',
          className: 'location-search-input desiredLocation',
        })}
        />
      
        <div className={"autocomplete-dropdown-container "+ (suggestions.length
          ? 'suggestionBorder': '')}>
          {loading && <div className="suggestion-item bg-white">Loading...</div>}
          {suggestions.map(suggestion => {
            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
            const style = suggestion.active
            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
            : { backgroundColor: '#ffffff', cursor: 'pointer' };
            return (
              <div {...getSuggestionItemProps(suggestion, {className, style})}>
              <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
    
  render() {
    return (
      <div className = "App">
        <div className="SearchBoxComp">
          <h1 className = "text-center searchTitle">
          Enter your Desired location 
          </h1>
          <div id = "search-container">
            <div className = "form-group">
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {this.renderAutocomplete}
              </PlacesAutocomplete>
            </div>
          </div>
          <div className={"resultStops "+ (this.state.nearest.length ? '': 'hide')}>
            <h3>The nearest bus stops to your destination are : </h3>
            {this.state.nearest.map(stop => 
              <div>{stop.Stop}</div>
            )}
          </div>
        </div>
        <Link to="routes"> <div id="AllRoutesHyperlink"> <b> View All Routes</b> </div> </Link>
      </div>
    ); 
  }
}
  
export default App;