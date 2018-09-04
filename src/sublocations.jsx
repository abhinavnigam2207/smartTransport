import React, { Component } from 'react';
import { fetchResource } from './httpCall';
import "./styles/App.css";

export class Sublocations extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sublocations: []
        };
    }

    componentDidMount() {
        fetchResource('sublocations').then((resp) => {
            this.setState({
                sublocations: [...new Set(resp.map(item => item.Sublocation))]
            });
        });
    }

    render() {
        return (
            <div className="SelectLocation2"> 
                <center> 
                    <b>Please select your sub-location</b>
                    <select name='List2' id="List2">
                    {this.state.sublocations.map(sub => 
                        <option value={sub}>{sub}</option>
                    )}
                    </select>
                </center>
            </div>
        );
    }
}
