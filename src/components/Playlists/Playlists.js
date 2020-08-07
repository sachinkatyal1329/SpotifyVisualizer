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
    
    setPlayListState = (playlist) => {
        this.setState({selectedPlaylist: playlist})
        this.props.callback(playlist)
    }

    render() {
        return(
            <>
                <div className ="container-fluid py-2">
                    <h3 className ="font-weight-light">Playlists</h3>
                    <div className ="d-flex flex-row flext-nowrap overflow-auto">
                        {this.state.playlists.map(playlist => 
                            <a key = {playlist.id} className = "card card-body">
                                <img style={{cursor:'pointer'}} onClick = {() => this.setPlayListState(playlist.id)} src = {playlist.image}/>
                            </a>
                        )}
                    </div>
                </div>  
            </>
        )
    }
}

export default Playlists