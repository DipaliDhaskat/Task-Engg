
import { useState, useEffect } from 'react'
import { useLocation,useHistory } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export const CountryInfo = () => {

	const [info, setInfo] = useState<any>();
	const history = useHistory();

	const location = useLocation() 

	useEffect(() => {
		setInfo(location.state)
	})

	const handleWeather = (capital: any) => {

		history.push(`/WeatherDetails/${capital}`)

	}
	return <>

		<h1>CountryInfo</h1>

		{
			info?.information?.length > 0 ? (info?.information?.map((ele: any) => {
				return <div>
					<Card sx={{ width: 345, mx: "auto", my: 4 }}>
						<CardMedia
							component="img"
							height="140"
							image={ele.flag}
							alt="flag"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								Capital : {ele.capital}
							</Typography>
							<Typography gutterBottom variant="h6" component="div">
								Population :{ele.population}
							</Typography>
							<Typography gutterBottom variant="h6" component="div">
								Latlng :{ele.latlng}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small" variant="contained" sx={{ mx: "auto" }} onClick={() => handleWeather(ele.capital)}> Capital Weather</Button>
						</CardActions>
					</Card>

				</div>
			})) : <CircularProgress disableShrink />
		}


	</>
}