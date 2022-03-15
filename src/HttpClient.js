import axios from "axios"

const nasaEndpoint = process.env.REACT_APP_NASA_ENDPOINT
const nasaApiKey = process.env.REACT_APP_NASA_API_KEY

axios.interceptors.request.use(
  config => {
    config.params = config.params ? config.params : {}
    config.params["api_key"] = nasaApiKey

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
function getApod() {
  return axios.get(`${nasaEndpoint}planetary/apod`)
}
function getApodByDay(date) {
  return axios.get(`${nasaEndpoint}planetary/apod`, { params: { date } })
}

const apiMethods = {
	getApod,
	getApodByDay,
}

export default apiMethods

