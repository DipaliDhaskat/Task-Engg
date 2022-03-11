
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export const WeatherDetails = () => {

	const [details, setDetails] = useState<any>()
	const param = useParams<any>();


	useEffect(() => {
		const weather = async () => {
			await axios.get(`http://api.weatherstack.com/current?access_key=589f85c0441228ec5bcb091f71edd50f&query=${param.capital}`)
				.then((res: any) => {
					return res.data
				})
				.then((data: any) => {
					setDetails(data)
				})
				.catch((error) => {
					alert(error)
				})
		}
		weather()
	}, [])
	return <>

		<h2 data-testid="weather-heading">Weather Details</h2>

		{details ? (<Card sx={{ width: 345, mx: "auto", my: 4 }}>
			<CardMedia
				component="img"
				height="140"
				image={details.current.weather_icons[0]}
				alt="weather_icons"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" color="primary">
					{details?.location.name}
				</Typography>
				<Typography gutterBottom variant="body2" color="primary">
					Temperature: {details?.current.temperature}
				</Typography>
				<Typography gutterBottom variant="body2" color="primary">
					Wind_Speed: {details?.current.wind_speed}
				</Typography>
				<Typography gutterBottom variant="body2" color="primary">
					Precip: {details?.current.precip}
				</Typography>
			</CardContent>
			<CardActions>

			</CardActions>
		</Card>)
			: <CircularProgress disableShrink />

		}


	</>
}