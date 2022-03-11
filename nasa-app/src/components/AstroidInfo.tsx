import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';


export const AsteroidInfo = () => {
    const [data, setData] = useState<any>()
    const location = useLocation<any>();

    useEffect(() => {
        setData(location.state);
    }, [])

    return (
        <>
            <h1 data-testid="asteroid-heading"> Asteroid Information</h1>
            <TableContainer sx={{ width: 700, margin: 'auto' }}>
                <Table sx={{ width: 700 }} aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell >{data?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Url</TableCell>
                            <TableCell >{data?.nasa_jpl_url}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>is_potentially_hazardous</TableCell>
                            <TableCell>{data?.is_potentially_hazardous_asteroid ? "True" : "False"}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}