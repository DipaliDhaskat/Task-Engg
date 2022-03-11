
import { useHistory } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux'

interface RootState {
	info: []
}
export const CountryInfo = () => {
	const history = useHistory();
	const information = useSelector((state: RootState) => state?.info)
	const handleWeather = (capital: any) => {
		history.push(`/WeatherDetails/${capital}`)
	}
	return <>

		<h1>Country Information</h1>
		{
			information?.length > 0 ? (information?.map((ele: any) => {
				return <div>
					<Card sx={{ width: 345, mx: "auto", my: 4 }}>
						<CardMedia
							component="img"
							height="140"
							image={ele.flags?.png}
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
								Latlng :{JSON.stringify(ele.latlng)}

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