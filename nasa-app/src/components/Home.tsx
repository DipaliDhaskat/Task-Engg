import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getData } from '../Store/Action';

export const Home = () => {
    const randomId = useSelector<any>(state => state.id);
    const dispatch = useDispatch();

    const [id, setId] = useState<string>("");
    const [flag, setFlag] = useState<number>(0);
    const history = useHistory();

    const url: string = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=c7AFIeccy1roQgoqGW3KyV0tRHkuQKGKOYf32L1j`;

    useEffect(() => {
        dispatch(getData());
    }, [dispatch])

    const getSubmitIdData = async (url: string) => {
        await axios.get(url)
            .then((res: any) => {
                const { id, name, nasa_jpl_url, is_potentially_hazardous_asteroid } = res.data;

                history?.push({
                    pathname: `./AsteroidInfo/${id}`,
                    state: { name, nasa_jpl_url, is_potentially_hazardous_asteroid },
                });
            })
            .catch((error) => {
                alert(error);

            });
    };


    const handleId = (event: any) => {
        setId(event.target.value)
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        getSubmitIdData(url);
    }
    const handleRandomId = () => {
        dispatch(getData());
        const info: Array<any> = [randomId]
        const getId = randomId && info[0][Math.floor(Math.random() * info[0].length)]?.id
        setId(getId);
        setFlag(1);
    }
    return (<>
        <div>
            <h1 data-testid="home-heading">Form </h1>
            <form onSubmit={handleSubmit}>
                <TextField type="text" value={id} data-testid="count" required onChange={handleId} placeholder="Enter Asteroid ID" /><br /><br />
                <Button variant="contained" color="primary" data-testid="submit-button" type="submit" disabled={flag < 1}>Submit</Button> <span> &#160; </span>
                <Button variant="contained" color="success" onClick={handleRandomId}>Random Asteroid </Button>
            </form>
        </div>

    </>)
}
