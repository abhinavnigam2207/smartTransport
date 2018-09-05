import React, { Component } from 'react';
import { fetchResource } from './httpCall';
import { Sublocations } from './sublocations';
import "./styles/App.css";

class Routes extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            sublocations: [],
            busRoute: []
        };
    }

    componentDidMount() {
        const promises = [
            fetchResource('allRoutes'),
            fetchResource('sublocations')
        ];
        Promise.all(promises).then((res) => {
            let busRoutes = [];
            res[1].forEach((bus)=> {
                let busRoute = {
                    busNumber: bus.busNumber,
                    routes: res[0].filter((stop)=>stop.busNumber===bus.busNumber)
                }
                busRoutes.push(busRoute);
            });
            this.setState({
                routes: res[0],
                sublocations: res[1],
                busRoutes: busRoutes
            })
        });
    }

    render() {
        return (
            <div className="mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 pl-5"> 
                        <b>Please select your location: </b>
                        <select name='List1' >
                            <option value="Gurugram">Gurugram</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                        <Sublocations sublocs={this.state.sublocations}></Sublocations>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row p1">
                    <div className="col-2">
                        <div className="route-container">
                            <ul>
                                {this.state.sublocations.map((sub, i) => 
                                    <li><a key={i}>Route {sub.busNumber}</a></li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="route-container">
                            <h2 className="download-all">
                                <a>Download All Routes</a>
                            </h2>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="route-container">
                            <ul>
                                <li>Stop1</li>
                                <li>Stop2</li>
                                <li>Stop3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
    }
    
export default Routes;