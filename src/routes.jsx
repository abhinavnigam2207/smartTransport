import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { fetchResource } from './httpCall';
import { Sublocations } from './sublocations';
import "./styles/App.css";

class Routes extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            sublocations: [],
            busRoute: [],
            selectedRouteStops: [],
            allStops: this.props.location.allStops
        };
    }

    componentDidMount() {
        const promises = [
            fetchResource('allRoutes'),
            fetchResource('sublocations')
        ];
        const allStops = this.state.allStops;
        Promise.all(promises).then((res) => {
            let busRoutes = [];
            res[1].forEach((bus)=> {
                let stopsWithTime = res[0].filter((stop)=>stop.busNumber===bus.busNumber);
                stopsWithTime.forEach((stop) => { 
                    stop.pickupTime = allStops.find(o => o.stopId === stop.stopId).pickup;
                });
                let busRoute = {
                    busNumber: bus.busNumber,
                    stops: stopsWithTime
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

    showStops(sub) {
        const busRoute = this.state.routes.filter((route) => sub.busNumber === route.busNumber);
        const selectedRouteStops = busRoute.sort(function(a,b) {return (a.pickupTime > b.pickupTime) ? 1 : ((b.pickupTime > a.pickupTime) ? -1 : 0);} );
        this.setState({selectedRouteStops});
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
                                    <li className="hand"><a key={i} onClick={this.showStops.bind(this, sub)}>Route {sub.busNumber}</a></li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="route-container">
                            <h2 className="download-all">
                                <a>Download All Routes</a>
                            </h2>
                            <div className="text-center">
                                <Link to="/">
                                    <div>Back</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="route-container">
                            <ul>
                                {this.state.selectedRouteStops.map((stop,i) => 
                                    <li key={i}>{stop.pickupTime} - {stop.stop}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
    }
    
export default Routes;