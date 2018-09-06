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

    componentDidUpdate(prevProps, prevState) {
        if(this.props.sublocs.length) {
            const sublocs = [...new Set(this.props.sublocs.map(item => item.sublocation))]
            const prevSublocs = [...new Set(prevProps.sublocs.map(item => item.sublocation))]
            if(prevSublocs.length !== sublocs.length) {
                this.setState({
                    sublocations: sublocs
                });
            }
        }
    }

    render() {
        return (
            <div className="mt-2"> 
                <b>Please select your sub-location: </b>
                <select name='List2'>
                {this.state.sublocations.map((sub, i) => 
                    <option key={i} value={sub}>{sub}</option>
                )}
                </select>
            </div>
        );
    }
}
