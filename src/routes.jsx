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
        fetchResource('routes').then((res)=>{
            this.setState({
                routes: res
            })
        })
    }

    render() {
        return (
            <div className = "Page2">
                <div className="SelectLocation"> <center><b>Please select your location: </b>
                    <select name='List1' id="List1" >
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Bengalore">Banglore</option>
                    </select>
                    </center>
                </div> 
                <Sublocations></Sublocations>
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