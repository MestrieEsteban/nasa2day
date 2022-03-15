import React, { useState, useEffect } from "react"
import HttpClient from "./HttpClient"
import './styles/App.scss';
import moment from 'moment';
import random from './randomDate';

const randomDate = random.randomDate(moment().format("YYYY-MM-DD"), "1995-06-16").format("YYYY-MM-DD");


const App = () => {
  const [apod, setApod] = useState({})

  useEffect(() => {
    HttpClient.getApodByDay(randomDate).then(apodData => {
      setApod(apodData.data)
    })
  }, [])

  return (
    <div className="app">
		<div className="content" style={{backgroundImage: `url(/images/bg.svg)`}}>
			<h1 className="title">NASA2DAY</h1>
			<p className="subtitle">{randomDate}</p>
			{apod && (
				<div>
					<div className="ImageTitle">
						{apod.title}
					</div>
					<img src={apod.url} alt="APOD" className="ImageDay" />
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