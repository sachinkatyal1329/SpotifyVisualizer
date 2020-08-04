import React, { Component } from 'react';
import SpotifyController from './components/Spotify/Spotify';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css';


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
            <Container fluid>
                <Row>
                    <Col>Header</Col>
                </Row>
                <Row  style = {{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.2)", margin: 5, marginTop: 20, borderRadius: 7, backgroundColor: "rgb(40,42,61)"}}>
                    <Col>PlayLists</Col>
                </Row>
                <Row>
                    <Col md style = {{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.2)", borderRadius: 7, backgroundColor: "rgb(40,42,61)", margin: 20, marginRight: 10 }} >Tracks</Col>
                    <Col md style = {{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.2)", borderRadius: 7, backgroundColor: "rgb(40,42,61)", margin: 20, marginLeft: 10 }}>
                        { renderLogin() }
                        <SpotifyController token = {this.state.token} loggedIn = {this.state.loggedIn} />
                    </Col>
                </Row>
            </Container>
                
                {/* {renderLogin()} */}
                {/* <SpotifyController token = {this.state.token} loggedIn = {this.state.loggedIn} /> */}
                
            </>
        )
    }
}

export default App