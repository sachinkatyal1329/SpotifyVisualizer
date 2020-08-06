import React, { Component } from 'react'
import { Radar } from 'react-chartjs-2'
import './RadarGraph.css'

const radarData = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Def', 'Speed'],
    datasets: [
      {
        label: 'Charizard',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        pointBorderColor: 'rgba(255, 0, 0, 1)',
        pointBackgrounColor: 'rgba(255, 0, 0, 1)',
        pointRadius: 1,
        data: [78, 84, 78, 109, 85, 100]
      }
    ]
  }

class RadarGraph extends Component {
    constructor(props) {
        super(props)
    }
    

    render () {
        return(
            <>
                <Radar id = "radar" data = {radarData} />
            </>
        )
    }
}

export default RadarGraph