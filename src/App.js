import React, { useState, useEffect } from "react"
import HttpClient from "./HttpClient"
import './styles/App.scss'
import moment from 'moment'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { FcLikePlaceholder, FcLike } from 'react-icons/fc'

import random from './randomDate'

let date = moment().format('YYYY-MM-DD')


const App = () => {
	const [apod, setApod] = useState({})
	const dt = null
	const [ndate, setDate] = useState(dt)
	const [buttonLike, setButtonLike] = useState()


	const newImage = (date) => {
		HttpClient.getApodByDay(date).then(apodData => {
			setButtonLike(JSON.parse(localStorage.getItem(apodData.data.date)) ? <FcLike className="iconButton" /> : <FcLikePlaceholder className="iconButton"/>)
			setApod(apodData.data)
		})
	}
	const handelDate = () => {
		let dt = random.randomDate(moment().format("YYYY-MM-DD"), "1995-06-16").format("YYYY-MM-DD");
		setDate(dt)
		newImage(dt);
	}
	const likeImage = () => {
		//save local storage
		let locaDate = ndate ? ndate : date
		let imageLiked = JSON.parse(localStorage.getItem(locaDate));
		if (!imageLiked) {
			imageLiked = {
				date: locaDate,
				url: apod.url,
			}
			localStorage.setItem(locaDate, JSON.stringify(imageLiked));
			setButtonLike(<FcLike className="iconButton" />)
		}
		else {
			//remove from local storage
			localStorage.removeItem(locaDate);
			setButtonLike(<FcLikePlaceholder className="iconButton" />)
		}



	}

	useEffect(() => {
		HttpClient.getApodByDay(date).then(apodData => {
			setButtonLike(JSON.parse(localStorage.getItem(apodData.data.date)) ? <FcLike className="iconButton" /> : <FcLikePlaceholder className="iconButton"/>)
			setApod(apodData.data)
		})
	}, [])


	return (
		<div className="app">
			<div className="content" style={{ backgroundImage: `url(/images/bg.svg)` }}>
				<h1 className="title">NASA2DAY</h1>
				<p className="subtitle">{ndate ? ndate : date}</p>
				{apod && (
					<div>
						<div className="ImageTitle">
							{apod.title}
						</div>
						<img src={apod.url} alt="APOD" className="ImageDay" />
						<div className="inLineButton">
							<span className="button1" onClick={likeImage}>{buttonLike}</span>
							<span className="button2" onClick={handelDate}><GiPerspectiveDiceSixFacesRandom className="iconButton" /></span>
						</div>
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