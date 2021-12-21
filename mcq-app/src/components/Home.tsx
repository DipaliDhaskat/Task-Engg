
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Lang from '../model/Language.json';
import { GetData } from '../store/Action';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export const Home = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [lang, setLang] = useState<string>("English");
  const history = useHistory();


  useEffect(() => {
    dispatch(GetData());
  }, [])


  const handleChange = (e: any) => {
    setName(e.target.value)
  }

  const handleLang = (e: any) => {
    setLang(e?.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    history.push({
      pathname: `/Question`,
      state: { lang }
    });
  }

  return (<>
    <h1 data-testid="testHome">Form</h1>
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormLabel component="legend">Name</FormLabel>
      <TextField id="outlined-basic" label="Name" data-testid="name-input" variant="outlined" value={name} required onChange={handleChange} /><br /><br /><br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="radio-buttons-group"
        >

          <FormControlLabel value="female" key="female" control={<Radio required={true} />} label="Female" aria-required />
          <FormControlLabel value="male" key="male" control={<Radio required={true} />} label="Male" aria-required />
        </RadioGroup>
      </FormControl><br /><br />

      <FormControl component="fieldset">
        <FormLabel component="legend">Language </FormLabel>
        <RadioGroup
          aria-label="Lang"
          name="radio-buttons-group lang"
        >
          {Lang.Language.map((ele: any) => {
            return <FormControlLabel key={ele.id} value={ele.id} control={<Radio required={true} />} label={ele.name} onChange={handleLang} aria-required />
          })}
        </RadioGroup>
      </FormControl><br /><br />
      <Button type="submit" data-testid="submit-button" variant="contained">Submit</Button>
    </form>
  </>)
}