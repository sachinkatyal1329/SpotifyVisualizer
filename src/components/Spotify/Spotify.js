import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { Line } from 'react-chartjs-2';

const spotifyWebApi = new Spotify();

class SpotifyController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nowPlaying: {
                name : "Not Checked",
                iamge: ''
            },
            labels: [],
            datasets: []
        }

        if (this.props.token != null) {
            spotifyWebApi.setAccessToken(this.props.token);
        }
    }

    async componentDidMount() {
        this.getNowPlaying()
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

        //get track id's
        const ids = []
        for (var groups of tracks) {
            for (var track of groups.items) {
                ids.push(track.track.id)
            }
        }
        

        //Get analysis data for each track
        const analysis = await spotifyWebApi.getAudioFeaturesForTracks(ids)
        console.log(analysis)

        const valence = []
        const labels = []
        let count = 0;
        for (var track of analysis.audio_features) {
            valence.push(
                track.valence
            )
            labels.push(count)
            count++;
        }

        valence.reverse()
        this.setState({
            labels,
            datasets : [
                {
                    label: 'Sentiment',
                    fill: 'origin',
                    lineTension: 0.3,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: valence
                }
            ]
        })

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
        const renderGetPlaying = () => {
            if (!this.props.loggedIn) return;
            return (
                <>
                    <div>Now Playing : { this.state.nowPlaying.name }</div>
                    <div>
                        <img alt = "HI" src = { this.state.nowPlaying.image } style = {{ wdith : 100 }} />
                    </div>
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
                </>
            )

        }

        return (
            <div>
            {renderGetPlaying()}
            <div /*style = {{width : 700}}*/><Line
                data={
                    this.state}
                options={{
                    response: true,
                    title:{
                    display:true,
                    text:'Sentiment of Music over time',
                    fontSize:20,
                    },
                    legend:{
                    display:true,
                    position:'right'
                    },
                }}
                />
            </div>
            </div>
        )
    }
}

export default SpotifyController
