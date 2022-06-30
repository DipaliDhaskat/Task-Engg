import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

//material-ui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
//toast
import Swal from 'sweetalert2';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ParkingSpace = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [space, setSpace] = useState<any>();
    const [allocateParkNo, setAllocateParkNo] = useState<any>([{}]);
    //Registration of car for Parking (Parking allocation) 
    const [open, setOpen] = useState(false);
    const [carNo, setCarNo] = useState<string>();
    const [parkTime, setParkTime] = useState<any>();
    let [randomNum, setRandomNum] = useState<any>(0);
    let [regTimeInSec, setRegTimeInSec] = useState<any>(0);

    //Exit Car from parking
    const [openTwo, setOpenTwo] = useState(false);
    const [parkingCharge, setParkingCharge] = useState<string>();
    const [exitNo, setExitNo] = useState<any>();
    //parking slot number that user enter
    useEffect(() => {
        setSpace(location.state);
    }, [])

    //Registration of car for Parking (Parking allocation)
    const handleRegistration = () => {
        setCarNo("");
        setOpen(true);
        // const today = new Date();
        let today = new Date();
        let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
        let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
        let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
        let curTime = hours + ':' + minutes + ':' + seconds;

        setParkTime(curTime)
        const todaySec = new Date(),
            timeInSec = todaySec.getHours() * 3600 + todaySec.getMinutes() * 60 + todaySec.getSeconds();
        setRegTimeInSec(timeInSec);

    }
    const handleClose = () => {
        setOpen(false);
        setCarNo("");
        setParkTime("")
    }
    const handleCarNo = (e: any) => {
        setCarNo(e.target.value)
    }

    //random no generation 

    const generateRandom = () => {

        let allNum = spaceAllocateNumber();
        let num: number, randomNo: any;

        allocateParkNo.map((ele: any) => {
            if (allNum.indexOf(Number(ele?.randomNo)) > -1) {
                allNum.splice(allNum.indexOf(Number(ele?.randomNo)), 1);
            }
        })
        num = allNum[Math.floor(Math.random() * allNum.length)];

        randomNo = num;
        randomNo && setAllocateParkNo([...allocateParkNo, { "carNum": carNo, "randomNo": randomNo }])
        setRandomNum(randomNo);
    }

    const registerCar = () => {
        setOpen(false);
        allocateParkNo.length > 0 && allocateParkNo.length <= Number(space?.numSpace) ? generateRandom() : Swal.fire('Parking Slot full')
    }

    //Exit Car from parking
    const handleExit = (index: any) => {
        setOpenTwo(true);
        setExitNo(index);
        const today = new Date(),
            curTime = today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds();

        const parkHour = Number(curTime) - Number(regTimeInSec);
        console.log(regTimeInSec)
        console.log(Number(curTime) - Number(regTimeInSec))

        let hours = Math.floor(parkHour / 3600); // get hours
        let minutes = Math.floor((parkHour - (hours * 3600)) / 60); // get minutes
        let seconds = parkHour - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours < 10) { hours = hours; }
        if (minutes < 10) { minutes = minutes; }
        if (seconds < 10) { seconds = seconds; }
        console.log(hours + ':' + minutes + ':' + seconds); // Return is HH : MM : SS
        let parkCharge: number;
        if (hours <= 2) {
            if (hours === 2) {
                if (minutes === 0 && seconds == 0) {
                    parkCharge = 10
                }
                else {
                    parkCharge = 20
                }
            }
            else {
                parkCharge = 10
            }
        }
        else {
            parkCharge = (hours * 10) - 10;
        }
        setParkingCharge(parkCharge.toString())
    }

    const handleCloseTwo = () => {
        allocateParkNo.map((ele: any, index: number) => {
            if (Number(ele?.randomNo) === Number(exitNo)) {
                allocateParkNo.splice(index, 1);
            }
        })
        setOpenTwo(false);
    }
    const handlePayment = () => {
        // {“car-registration”: ”TU68 0BB” .”charge”:20
        const data = { "car-registration": carNo, "charge": parkingCharge }
        fetch("https://httpstat.us/200", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(data);
        });
    }

    const spaceAllocateNumber = () => {
        const spaceAllocate = [];
        let spaceNo = Number(space?.numSpace);
        for (let space = 1; space <= spaceNo; space++) {
            spaceAllocate.push(space);
        }
        return spaceAllocate;
    };
    //rendring data
    return <div>
        <h1 data-testid="park-heading">Parking Space</h1>
        <Button variant="contained" onClick={handleRegistration}> Car registration</Button>

        <Box sx={{ width: '100%', m: 2 }}>
            <Grid container spacing={3} >

                {spaceAllocateNumber().map((ele: any) => {
                    return <Grid item xs={4} key={ele} >
                        <Card sx={{ height: "100%" }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Car Parking
                                </Typography>
                                <Typography variant="h5" component="div" color="blue" sx={{ my: 1 }}>
                                    Parking No :  {ele}
                                </Typography>
                                {
                                    allocateParkNo.length > 0 && allocateParkNo.map((spAlocate: any, index: number) => {
                                        if (Number(spAlocate.randomNo) === Number(ele)) {
                                            return <Typography variant="h6" sx={{ my: 2 }} color="green" >
                                                {`Allocated`}<br />
                                                {`Car No : ${spAlocate?.carNum} `}<br />

                                                <Button variant="contained" size="small" onClick={() => handleExit(ele)}> Exit car</Button>
                                            </Typography>
                                        }

                                    })
                                }

                            </CardContent>

                        </Card>
                    </Grid>
                })
                }
            </Grid>
        </Box>
        {/* Registration of car for Parking (Parking allocation) */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h4" component="div" sx={{ mb: 4 }}>
                    Car Registration
                </Typography>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    Car Number  <TextField id="outlined-basic" variant="outlined" value={carNo} onChange={handleCarNo} />
                </Typography>
                <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    Parking Time : {parkTime}
                </Typography>
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={registerCar}> Register</Button>
                </Typography>

            </Box>
        </Modal>

        {/* Exit Car from parking */}
        <Modal
            open={openTwo}
            onClose={handleCloseTwo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h4" component="div" sx={{ mb: 4 }}>
                    Parking Charges
                </Typography>
                <Typography variant="h5" component="div" sx={{ mb: 4 }}>
                    $ {parkingCharge}
                </Typography>
                <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handlePayment} sx={{ mx: 2 }}>Payment taken</Button>
                    <Button variant="contained" onClick={handleCloseTwo}>Back</Button>
                </Typography>

            </Box>
        </Modal>
    </div>;
}
export default ParkingSpace;