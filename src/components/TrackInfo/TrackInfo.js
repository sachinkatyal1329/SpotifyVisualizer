import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class TrackInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trackId: null,
            trackName: null
        }
    }

    async componentDidMount() {
        const track = await spotifyWebApi.getTrack(this.props.trackId)        
        this.setState({
            trackId: track.id,
            trackName: track.name
        })
    }

    async componentDidUpdate() {
        if (this.props.trackId == this.state.trackId) return;
            const track = await spotifyWebApi.getTrack(this.props.trackId)
            
            this.setState({
                trackId: track.id,
                trackName: track.name
            })
        }

    render() {
        return (
            <>
                <h1>{this.state.trackName}</h1>
            </>
        )
    }

}

export default TrackInfo