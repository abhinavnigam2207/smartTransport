import React, { Component } from 'react';
import { fetchResource } from './httpCall';
import { Sublocations } from './sublocations';
import "./styles/App.css";

class Routes extends Component {

    constructor(props) {
        super(props);
        this.state = {
          routes: []
        };
    }

    componentDidMount() {
        fetchResource('allRoutes').then((res)=>{
            this.setState({
                routes: res
            })
        })
    }

    render() {
        return (
            <div className="mt-5">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8 pl-5"> 
                        <b>Please select your location: </b>
                        <select name='List1' >
                            <option value="Gurgaon">Gurgaon</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                        <Sublocations></Sublocations>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-6"></div>
                    <div className="col-2"></div>
                </div>
                 
                <section>
                    <nav>
                        <div>
                            <ul>
                                <div>
                                    <li><a href="#">Route1</a></li>
                                    <li><a href="#">Route2</a></li>
                                    <li><a href="#">Route3</a></li>
                                    <li><a href="#">Route4</a></li>
                                    <li><a href="#">Route5</a></li>
                                    <li><a href="#">Route6</a></li>
                                    <li><a href="#">Route7</a></li>
                                    <li><a href="#">Route8</a></li>
                                    <li><a href="#">Route9</a></li>
                                    <li><a href="#">Route10</a></li>   
                                </div>
                            </ul>
                            <br></br>
                            <b> <a href="#">Download </a> </b>
                        </div>
                    </nav>
                    <article>
                        <center>
                            <h2 id="downloadLink">
                                <a href="#">Download All Routes</a>
                            </h2>
                        </center>
                    </article>
                    <aside>
                        <li>Stop1</li>
                        <li>Stop2</li>
                        <li>Stop3</li>
                    </aside>
                </section>
            </div>
            );
        }
    }
    
export default Routes;