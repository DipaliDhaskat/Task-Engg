import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getData } from '../Store/Action';

interface RootState {
	info: []
}
export const Home = () => {
	const [name, setName] = useState<string>("")
	const [flag, setFlag] = useState<number>(0);
	const information = useSelector((state: RootState) => state?.info)
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = (e: any) => {
		setName(e.target.value);
		setFlag(1);
	}
	const handleSubmit = (e: any) => {
		e.preventDefault();
		dispatch(getData(`${name}`));
		history.push({
			pathname: `./CountryInfo/${name}`,
			state: information
		})
	}
	return <>
		<h1 data-testid="home-heading">FORM</h1>
		<form onSubmit={handleSubmit}>
			<TextField id="outlined-basic" data-testid="name-data-input" value={name} label="CountryName" variant="outlined" onChange={handleChange} placeholder="Enter country" /><br /><br />
			<Button variant="contained" data-testid="submit-button" type="submit" disabled={flag < 1}>Submit</Button>
		</form>
	</>
}