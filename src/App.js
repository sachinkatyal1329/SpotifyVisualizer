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

    async componentDidMount() {
        var total = (await spotifyWebApi.getMySavedTracks()).total
        var tracks = []

        var limit = 500
        
        for (var i = 0; i < 100 / 50; i++) {
            //console.log("HI" + i)
            tracks.push(
                await spotifyWebApi.getMySavedTracks({
                    limit:50,
                    offset: i * 50
                })
            )
        }

       // console.log(tracks);


        //get track id's
        const ids = []
        for (var groups of tracks) {
            for (var track of groups.items) {
                ids.push(track.track.id)
            }
        }

        //console.log(ids)
        //Get analysis data for each track

        const analysis = await spotifyWebApi.getAudioFeaturesForTracks(ids)
        console.log(analysis)

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

    getNowPlaying = async () => {
        //const playlists = await spotifyWebApi.getUserPlaylists();
        //console.log(playlists);

        // for (var playlist of playlists.items) {
        //     console.log(playlist.name);
        //     const track = await spotifyWebApi.getPlaylistTracks(playlist.id)
        //     console.log(track.items[0].track.name)

        //     console.log(currentSong.item.id)
        //     console.log(await spotifyWebApi.getMyCurrentPlaybackState())

        //     break
        // }

        // const currentSong = await spotifyWebApi.getMyCurrentPlaybackState()
        // console.log(currentSong.item.id)
        // console.log(await spotifyWebApi.getAudioFeaturesForTrack(currentSong.item.id))
        // console.log(await spotifyWebApi.getAudioAnalysisForTrack(currentSong.item.id))

        

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