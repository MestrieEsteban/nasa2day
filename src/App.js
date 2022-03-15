import React, { useState, useEffect } from "react"
import HttpClient from "./HttpClient"
import './styles/App.scss';
import moment from 'moment';



const App = () => {
  const [apod, setApod] = useState({})

  useEffect(() => {
    HttpClient.getApodByDay().then(apodData => {
      setApod(apodData.data)
    })
  }, [])

  return (
    <div className="app">
		<div className="content" style={{backgroundImage: `url(/images/bg.svg)`}}>
			<h1 className="title">NASA2DAY</h1>
			<p className="subtitle">{moment().format("DD/MM/YYYY")}</p>
			{apod && (
				<div>
					<div className="ImageTitle">
						{apod.title} 
					</div>
					<img src={apod.hdurl ? apod.hdurl : apod.hdurl} alt="APOD" className="ImageDay" />
					<div className="description">
						<p>{apod.explanation}</p>
					</div>
				</div>
			)}
		</div>
    </div>
  )
}

export default App