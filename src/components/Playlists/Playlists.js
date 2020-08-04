import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import './Playlists.css'

const spotifyWebApi = new Spotify();

class Playlists extends Component {
    constructor(props) {
        super(props)

        if (this.props.token != null) {
            spotifyWebApi.setAccessToken(this.props.token);
        }

    }

    async componentDidMount() {
        //handle getting all the playlist information
    }

    render() {
        return(
            <>
              <div class="container-fluid py-2">
                <h3 class="font-weight-light">Playlists</h3>
                <div class="d-flex flex-row flext-nowrap overflow-auto">
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                    <div class="card card-body">Card</div>
                </div>
            </div>  
            </>
        )
    }
}

export default Playlists