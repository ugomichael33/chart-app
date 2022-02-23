import React, {useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)


function BarChart() {
    const [labels, setLabels] = useState([])
    const [occurrence, setOccurrence] = useState([])


    var data = {
      labels: labels,
      datasets: [
        {
          labels: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: occurrence
        }
      ]
    }
    
    useEffect(() => {
      const fetchData = async() => {
      await (fetch("https://data-imdb1.p.rapidapi.com/series/id/tt0108778/awards?page_size=22", {
	        "method": "GET",
	        "headers": {
	      	"x-rapidapi-host": "data-imdb1.p.rapidapi.com",
		      "x-rapidapi-key": "a4427814a3mshd91e3d9aebfece7p1b3113jsn90d7c2d02d6e"
	        }
      })
      .then(response => response.json())
      .then(data => {
      let labels = []
      let year = []
      let occurrence = []
      for ( let i = 0; i < data.results.length; i++ ) {
            labels.push(data.results[i].year)
      }
      labels = labels.sort()
      let tempYear = labels[0]
      let count = 0
     
      for ( let i =0; i < labels.length; i++ ) {          
           if ( tempYear !== labels[i] ) {
             year.push( labels[i] )
             occurrence.push( count )
             count = 0
           }
              tempYear = labels[i]
              count++        
      }
        setOccurrence( occurrence )
        setLabels( year ) 
      })
      .catch(err => {
	    console.error(err);
      })
      )}
    fetchData()
  },[])

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }
  return (
    <div>
        <Bar 
            data={data}
            height={400}
            options={options}
        />
    </div>
  )
}

export default BarChart