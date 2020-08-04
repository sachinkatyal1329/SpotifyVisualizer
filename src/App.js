import React, { Component } from 'react';
import SpotifyController from './components/Spotify/Spotify';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col} from 'react-bootstrap';


class App extends Component {
    constructor() {
        super()
        const params = this.getHashParams();
        console.log(params);
        this.state = {
            loggedIn: params.access_token ? true : false,
            token: params.access_token
        }    
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }


    render() {
        const renderLogin = () => {
            if (this.state.loggedIn) return;
    
            return (
                <>
                    <a href = "http://localhost:8888/login">
                        <button>Login to spotify</button>
                    </a>
                </>
            )
        }
        return (
            <>
                <Row style = {{backgroundColor: "red"}}>
                    <Col>Header</Col>
                </Row>
                <Row  style = {{backgroundColor: "blue"}}>
                    <Col>PlayLists</Col>
                </Row>
                <Row>
                    <Col md style = {{backgroundColor: "green"}} >Tracks</Col>
                    <Col md style = {{backgroundColor: "yellow"}}>
                        <SpotifyController token = {this.state.token} loggedIn = {this.state.loggedIn} />
                    </Col>
                </Row>
                
                {/* {renderLogin()} */}
                {/* <SpotifyController token = {this.state.token} loggedIn = {this.state.loggedIn} /> */}
                
            </>
        )
    }
}

export default App