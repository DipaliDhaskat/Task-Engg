import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = () => {

    const [numSpace, setNumSpace] = useState();
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setNumSpace(e.target.value);
    }
    const handleSubmit = (e: any) => {
        navigate(`/ParkingSpace`, { state: { numSpace } });

    }
    return <div>
        <h1>Parking App</h1><br />
        No. of space <br /><br />

        <TextField id="outlined-basic" label="No of space" variant="outlined" value={numSpace} onChange={handleChange} /><br /><br />

        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>;
}

export default Home;