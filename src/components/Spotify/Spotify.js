import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import { Line } from 'react-chartjs-2';
import './Spotify.css';

const spotifyWebApi = new Spotify();

class SpotifyController extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nowPlaying: {
                name : "Not Checked",
                image: ''
            },
            labels: [],
            datasets: [],
            selectedPlaylistId: null
        }

    }

    async componentDidUpdate() {
        if (this.state.selectedPlaylistId != this.props.playlistId) {
            var total = (await spotifyWebApi.getMySavedTracks()).total
            var tracks = []

            var limit = 500
            
            for (var i = 0; i < 100 / 50; i++) {
                tracks.push(
                    await spotifyWebApi.getPlaylistTracks(this.props.playlistId, {
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
                try {
                    valence.push(
                        track.valence
                    )
                    labels.push(count)
                    count++;
                } catch {}
            }

            valence.reverse()
            this.setState({
                labels,
                datasets : [
                    {
                        label: 'Sentiment',
                        fill: 'origin',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: 'rgba(3, 148, 252 ,1)',
                        borderWidth: 2,
                        data: valence
                    }
                ],
                selectedPlaylistId: this.props.playlistId
            })
        }

    }

    


    render() {
        


        return (
            <>
                {/* {renderGetPlaying()} */}
                <div style = {{paddingBottom: 5}} className = "graph"><Line
                    data={
                        this.state
                    }
                    options={{
                        response: true,
                        title:{
                        display:true,
                        text:'Sentiment of Music over time',
                        fontSize:20,
                        },
                        legend : {
                            display:false
                        },
                        scales: {
                            xAxes: [{
                                ticks: { display: true },
                                gridLines: {
                                    display: true,
                                    drawBorder: false,
                                    color: "rgba(3, 148, 252 ,0.3)",

                                },
                            }],
                            yAxes: [{
                                ticks: { display: true },
                                gridLines: {
                                    display: false,
                                    drawBorder: true,
                                    color: "rgba(3, 148, 252 ,0.3)",
                                }
                            }]
                        }
                    }}
                    />
                </div>
            </>
        )
    }
}

export default SpotifyController
