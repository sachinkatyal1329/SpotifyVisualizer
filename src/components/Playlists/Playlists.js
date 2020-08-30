import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
import './Playlists.css'

const spotifyWebApi = new Spotify();

class Playlists extends Component {
    constructor(props) {
        super(props)

        this.state = {
            playlists: [],
            selectedPlaylist: null
        }

    }

    async componentDidMount() {
        //handle getting all the playlist information
        const playlists = []

        const temp = await spotifyWebApi.getUserPlaylists()
        for (var playlist of temp.items) {
            try {
                playlists.push({
                    image:playlist.images[1].url,
                    name:playlist.name,
                    id: playlist.id
                })
            } catch{}
        }

        this.setState({
            playlists
        })

        console.log(playlists)
    }
    
    setPlayListState = (playlistId, playlistName) => {
        if (playlistId == this.state.selectedPlaylist) {
            this.props.callback(null, null)
            return
        }

        this.setState({selectedPlaylist: playlistId})
        this.props.callback(playlistId, playlistName )
    }

    render() {
        return(
            <>
                <div className ="container-fluid py-2">
                    <h3 className ="font-weight-light">Playlists</h3>
                    <div className ="d-flex flex-row flext-nowrap overflow-auto">
                        {this.state.playlists.map(playlist => 
                            <a key = {playlist.id} className = "card card-body">
                                <img style={{cursor:'pointer'}} onClick = {() => this.setPlayListState(playlist.id, playlist.name)} src = {playlist.image}/>
                            </a>
                        )}
                    </div>
                </div>  
            </>
        )
    }
}

export default Playlists