import { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { GetData } from '../store/Action';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';


export const Question = () => {

  const history = useHistory();
  const location = useLocation<any>();
  const [data, setData] = useState<any>([]);
  const [answer, setAnswer] = useState<any>({});
  const [option, setOption] = useState<Array<string>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage] = useState<number>(5);
  const [lang, setLang] = useState<any>();
  const [color, setColor] = useState<string>("grey");
  const Usersdata = useSelector<any>(state => state.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetData());
    setData(Usersdata);
    setLang(location.state?.lang);
  }, [])

  const handleOption = (e: any, page: number) => {
    return <>
      {page === totalPage && (option.includes(`$(e.target.value)`) ? [...option] : option.push(e.target.value))}
      {page === totalPage ? setAnswer({ ...answer, [page]: (option) }) : setAnswer({ ...answer, [page]: [e.target.value] })}
    </>
  }

  const handleClick = (val: any) => {
    setCurrentPage(val);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();

    history?.push({
      pathname: `/Result`,
      state: { answer, data, lang },
    });
  }

  return <div>
    <h1>React Question Paper</h1>

    {data.map((e: any) => {
      return <Button variant="contained" type="submit" sx={{ m: 2, bgcolor: (Object.keys(answer).includes(`${e.id}`) ? "#db1a1a" : "#8f8b8b") }} onClick={() => { handleClick(e.id) }} >{e.id}</Button>
    })}

    <form onSubmit={(e) => handleSubmit(e)}>
      <h3>{currentPage} : {data && data[currentPage - 1]?.displayName[`${lang}`]} </h3>
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label={`option-${currentPage}`}
            name={`radio-buttons-group-${currentPage}`}
          >
            {data && data[currentPage - 1]?.option?.map((ele: any, index: number) => {
              return <>
                {
                  currentPage === totalPage
                    ? <FormControlLabel value={ele[`${lang}`] + "|" + ele.id} key={index + 1}
                      control={<Checkbox checked={answer[currentPage]?.includes(`${ele[`${lang}`] + "|" + ele.id}`)} />}
                      label={ele[`${lang}`]} onChange={(e) => handleOption(e, currentPage)} aria-required />
                    : <FormControlLabel value={ele[`${lang}`] + "|" + ele.id} key={index + 1}
                      control={<Radio checked={answer[currentPage]?.includes(`${ele[`${lang}`] + "|" + ele.id}`)} required={true} />}
                      label={ele[`${lang}`]} onChange={(e) => handleOption(e, currentPage)} aria-required />
                }
              </>
            })}
          </RadioGroup>
        </FormControl>
      </div>
      {currentPage === totalPage && <Button variant="contained" type="submit">Submit</Button>}
    </form>
  </div >
}
