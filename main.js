const apiKey =
	"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York"

const lat = 39.3321
const lon = -84.4173

function setLocaiton(lat, lon) {
	window.LINK = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York`
}

setLocaiton(lat, lon)

async function getWeather() {
	try {
		const response = await fetch(LINK)
		const data = await response.json()

		//deconstruct data from API and store as const for easier access
		const parsedData = parseData(data)
		console.log(data)
		// rename parsedData to current and parseData fucntion to parseCurrentWeather. create separate const for daily weather and separate function to parsedaily data.
		renderWeather(parsedData)
	} catch (error) {
		console.error("there was an error")
	}
}

function parseData({ current_weather, daily, daily_units, hourly }) {
	const {
		temperature: currentTemp,
		windspeed: windspeed,
		weathercode: iconCode,
	} = current_weather
	const { apparent_temperature_max: maxDailyTemp } = daily
	const { apparent_temperature_max: degF } = daily_units
	const { temperature_2m: hourlyTemp } = hourly
	return {
		currentTemp: Math.round(currentTemp),
		highTemp: Math.round(Math.max(...hourlyTemp)),
		lowTemp: Math.round(Math.min(...hourlyTemp)),
		windspeed: Math.round(windspeed),
		maxDailyTemp,
		iconCode,
		degF,
	}
}

function renderWeather(data) {
	renderCurrentWeather(data)
	// render weekly data, hourly data, etc.
}

function renderCurrentWeather(data) {
	// console.log(data.current_weather.temperature)
	setValue("current-temp", data.currentTemp, data.degF)
	setValue("high-temp", data.highTemp, data.degF)
	setValue("low-temp", data.lowTemp, data.degF)
	setValue("wind-speed", data.windspeed, " MPH")
}

function setValue(selector, value, unit, { parent = document } = {}) {
	parent.querySelector(`[data-${selector}]`).textContent = value + unit
}

getWeather()
