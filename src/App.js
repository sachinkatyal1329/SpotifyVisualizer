import React, { Component } from 'react'
import SpotifyController from './components/Spotify/Spotify'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Row, Col} from 'react-bootstrap'
import './App.css'
import Playlists from './components/Playlists/Playlists'
import Tracks from './components/Tracks/Tracks'
import Spotify from 'spotify-web-api-js'
import RadarGraph from './components/RadarGraph/RadarGraph'

const spotifyWebApi = new Spotify();

class App extends Component {
    constructor() {
        super()
        const params = this.getHashParams();
        console.log(params);
        this.state = {
            loggedIn: params.access_token ? true : false,
            token: params.access_token
        }    
        if (this.state.token != null) {
            spotifyWebApi.setAccessToken(this.state.token);
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
                <Row>
                    <Col className = "container playlists">
                        <Playlists />
                    </Col>
                </Row>
                <Row>
                    <Col className = "container tracks" md >
                        <Tracks playlistId = "2LTCHsvhnVyROpYsVq5VIt"/>
                    </Col>
                    <Col md>
                        { renderLogin() }
                        <Row>
                            <Col className = "container playlistGraphs" >
                                <SpotifyController token = {this.state.token} loggedIn = {this.state.loggedIn} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className = "container radarGraph">
                                <RadarGraph />
                            </Col>
                        </Row>
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