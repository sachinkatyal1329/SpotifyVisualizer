import React from 'react';
import SpotifyController from './Spotify/Spotify';


class App extends React.Component {
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
                <h1>Spotify Visualizer</h1>
                {renderLogin()}
                <SpotifyController token = {this.state.token} loggedIn = {this.state.loggedIn} />
                
            </>
        )
    }
}

export default App