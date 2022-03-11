import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getData } from '../Store/Action';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface RootState {
    info: []
}
export const Home = () => {
    const [hitPage, setHitPage] = useState<number>(0);
    const [data, setData] = useState<Array<any>>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const dispatch = useDispatch();
    const information = useSelector((state: RootState) => state?.info)

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getData(hitPage));
    }, [dispatch, hitPage])

    useEffect(() => {
        const interval = setInterval(() => {
            information.length !== 0 && data?.push(information)
            setHitPage(hitPage + 1);
        }, 10000);
        return () => clearInterval(interval);
    }, [hitPage]);

    const changePage = (event: any, value: number) => {

        setCurrentPage(value - 1)                                     //Display current page
    }
    const handleClick = (ele: any) => {
        navigate('./details', { state: { ele } })
    }

    const handleSearchChange = (e: any) => {
        setSearchValue(e.target.value);
    }

    return <>

        <h1 data-testid="home-heading">Pagination</h1>
        <TextField id="filled-basic" label="Search by Title and created at" variant="filled" onChange={handleSearchChange} />

        <TableContainer sx={{ my: 5, mx: "auto", width: 700 }}>
            <Table sx={{ width: 680, mx: "auto" }} aria-label="simple table">
                <TableHead>
                    {console.log(data)}
                    <TableRow>
                        <TableCell>CREATE AT</TableCell>
                        <TableCell>TITLE</TableCell>
                        <TableCell>AUTHOR</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(data[currentPage]?.hits)}
                    {data.length > 0 &&
                        data[currentPage]?.hits.filter((elem: any) => elem.title.includes(searchValue) || elem.created_at.includes(searchValue)).map((ele: any) => {
                            return <TableRow key={ele.objectID} hover={true} onClick={() => handleClick(ele)}>

                                <TableCell >{ele.created_at}</TableCell>
                                <TableCell >{ele.title}</TableCell>
                                <TableCell >{ele.author}</TableCell>
                                <TableCell>{ele.url}</TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>

        <Stack spacing={2} sx={{ my: 2, position: 'fixed', bottom: 0, bgcolor: 'warning.main', mx: 10 }}>
            <Pagination count={data.length} page={currentPage + 1} onChange={changePage} color="primary" sx={{ mx: "auto", fontSize: 30 }} />
            {/* display current page with all page count */}
        </Stack>
    </>
}