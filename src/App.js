import React from 'react';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends React.Component {
    constructor() {
        super()
        
        const params = this.getHashParams();
        console.log(params);
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name : "Not Checked",
                iamge: ''
            }
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token);
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

    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then(response => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        image: response.item.album.images[0].url
                    }
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Spotify Visualizer</h1>
                <a href = "http://localhost:8888">
                    <button>Login to spotify</button>
                </a>
                <div>Now Playing : { this.state.nowPlaying.name }</div>
                <div>
                    <img alt = "HI" src = { this.state.nowPlaying.image } style = {{ wdith : 100 }} />
                </div>
                { this.state.loggedIn &&
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
                }

            </div>
        )
    }
}

export default App