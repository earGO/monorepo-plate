import React from 'react';
import {useSelector} from 'react-redux';
import {selectors} from './weather-duck';

function WeatherComponent() {
	const weatherData = useSelector(selectors.weatherData);

	const data = weatherData[0];
	console.log(data);
	if (typeof data !== 'undefined') {
		const {name, weather, main} = data;
		const description = weather[0].description;
		const temperature = Math.floor(main.temp - 273);
		return (
			<div className="weather-root widget">
				<h2>{name}</h2>
				<div>{description}</div>
				<div>{temperature} °C</div>
			</div>
		);
	} else {
		return (
			<div className="weather-root widget">
				<h2>Loading...</h2>
			</div>
		);
	}
}

export default WeatherComponent;
