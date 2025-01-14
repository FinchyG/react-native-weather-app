import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';

import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './WeatherDataStyles.css';

// constants for formatting date display
import Months from './components/Months';
import WeekDays from './components/WeekDays';

// component constants
import H2Heading from './components/H2Heading';
import SearchBar from './components/SearchBar';
import SearchButton from './components/SearchButton';

function App() {
	const [input, setInput] = useState('');
	const [weather, setWeather] = useState({
		loading: false,
		data: {},
		error: false,
	});

	const toDateFunction = () => {

		const currentDate = new Date();
		const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${Months[currentDate.getMonth()]
			}`;
		return date;
	};

	const searchButtonPress = async (event) => {
		event.preventDefault();
		setInput('');
		setWeather({ ...weather, loading: true });
		const url = 'https://api.openweathermap.org/data/2.5/weather';
		const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
		await axios
			.get(url, {
				params: {
					q: input,
					units: 'metric',
					appid: api_key,
				},
			})
			.then((res) => {
				console.log('res', res);
				setWeather({ data: res.data, loading: false, error: false });
			})
			.catch((error) => {
				setWeather({ ...weather, data: {}, error: true });
				setInput('');
				console.log('error', error);
			});
		
	};

	const styles = StyleSheet.create({
		appStyle: {
			display: 'flex',
			flexDirection: 'column',
			fontFamily: 'sans-serif',
			justifyContent: 'center',
			alignItems: 'center',
			width: 250,
			backgroundColor: '#D3D8E0',
			textAlign: 'center',
			margin: 'auto',
			borderRadius: 2,
			paddingBottom: 24,
			boxShadow: '0 4 2 #E9EDF5'
		}
	});

	return (
		<View style={styles.appStyle}>
			<H2Heading
			  textContent='Place Search Weather App' 
      		/>
			<Text>Type in a place and hit enter to search for current weather</Text>
			<View>
				<SearchBar
					type="text"
					placeholder="Enter City Name.."
					name="query"
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>
			</View>
			<View>
				<SearchButton onPress={searchButtonPress} />
			</View>
			{weather.loading && (
				<>
					<br />
					<br />
					<Oval type="Oval" color="black" height={100} width={100} />
				</>
			)}
			{weather.error && (
				<>
					<br />
					<br />
					<Text className="error-message">
						<FontAwesomeIcon icon={faFrown} />
						<Text style={{ fontSize: '1.5rem' }}>City not found</Text>
					</Text>
				</>
			)}
			{weather && weather.data && weather.data.main && (
				<View>
					<View className="city-name">
						<Text>
							{weather.data.name}, <Text>{weather.data.sys.country}</Text>
						</Text>
					</View>
					<View className="date">
						<Text>{toDateFunction()}</Text>
					</View>
					<View className="icon-temp">
						<img
							className=""
							src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
							alt={weather.data.weather[0].description}
						/>
						{Math.round(weather.data.main.temp)}
						<sup className="deg">°C</sup>
					</View>
					<View className="des-wind">
						<Text>{weather.data.weather[0].description.toUpperCase()}</Text>
						<Text>Wind Speed: {weather.data.wind.speed}m/s</Text>
					</View>
				</View>
			)}
		</View>
	);
}

export default App;
