import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import './Playlists.css'

const spotifyWebApi = new Spotify();

class Playlists extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playlists: []
        }

        if (this.props.token != null) {
            spotifyWebApi.setAccessToken(this.props.token);
        }

    }

    async componentDidMount() {
        //handle getting all the playlist information
        const playlists = []

        const temp = await spotifyWebApi.getUserPlaylists()
        for (var playlist of temp.items) {
            try {
                playlists.push({
                    image:playlist.images[0].url,
                    name:playlist.name,
                    id: playlist.id
                })
            } catch{}
        }
        console.log(playlists)

        this.setState({
            playlists
        })
    }

    render() {
        return(
            <>
              <div class="container-fluid py-2">
                <h3 class="font-weight-light">Playlists</h3>
                <div class="d-flex flex-row flext-nowrap overflow-auto">
                    {this.state.playlists.map(playlist => 
                        <div key = {playlist.id} class = "card card-body">
                            <img src = {playlist.image}/>
                        </div>
                    )}
                </div>
            </div>  
            </>
        )
    }
}

export default Playlists