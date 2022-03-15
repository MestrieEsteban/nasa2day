import React, { useState, useEffect } from "react"
import HttpClient from "./HttpClient"
import './styles/App.scss'
import moment from 'moment'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { FcLikePlaceholder, FcLike, FcMenu } from 'react-icons/fc'

import random from './randomDate'

let date = moment().format('YYYY-MM-DD')


const App = () => {
	const [apod, setApod] = useState({})
	const dt = null
	const [ndate, setDate] = useState(dt)
	const [buttonLike, setButtonLike] = useState()


	const newImage = (date) => {
		HttpClient.getApodByDay(date).then(apodData => {
			setButtonLike(JSON.parse(localStorage.getItem(apodData.data.date)) ? <FcLike className="iconButton" /> : <FcLikePlaceholder className="iconButton" />)
			setApod(apodData.data)
		})
	}
	const handelDate = (date) => {
		let dt = date? date : random.randomDate(moment().format("YYYY-MM-DD"), "1995-06-16").format("YYYY-MM-DD");
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
			setButtonLike(JSON.parse(localStorage.getItem(apodData.data.date)) ? <FcLike className="iconButton" /> : <FcLikePlaceholder className="iconButton" />)
			setApod(apodData.data)
		})
	}, [])

	return (
		<div>
			{/* <div className="content" style={{ backgroundImage: `url(/images/bg.svg)` }}> */}
			<div className="content">
				<h1 className="title">NASA2DAY</h1>
				<p className="subtitle">{moment(ndate ? ndate : date).format("DD/MM/YYYY")}</p>
				{apod && (
					<div>
						<div className="ImageTitle">{apod.title}</div>
						<div className="ImageDiv" style={{ backgroundImage: `url(${apod.url})` }}>
						</div>
						<div className="inLineButton">
							<span className="button1" onClick={likeImage}>{buttonLike}</span>
							<span className="button1" onClick={() => handelDate()}><GiPerspectiveDiceSixFacesRandom className="iconButton" /></span>
						</div>
						<div className="description">
							<p>{apod.explanation ? apod.explanation : "No description"}</p>
						</div>
					</div>
				)}
				<div className="LikedContainer">
						{localStorage.length > 0 ?
							Object.keys(localStorage).map((key, index) => {
								return (
									<div className="LikedCardItem" onClick={() => handelDate(key)} key={index}>
										<div className="LikedCardItemTitle">
											<span>{moment(key).format("DD/MM/YYYY")}</span>
										</div>
										<div className="LikedCardItemImage" style={{ backgroundImage: `url(${JSON.parse(localStorage.getItem(key)).url})` }}>
										</div>
									</div>
								)
							}) :
							<div></div>
							
						}
				</div>
			</div>
		</div>
	)
}

export default App