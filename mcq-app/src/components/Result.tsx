import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';

export const Result = () => {
    const [info, setInfo] = useState<any>()
    let [count] = useState<number>(0);
    const location = useLocation<any>();

    useEffect(() => {
        setInfo(location.state);
        console.log(info?.answer)
    }, [])
    return <>
        <h1>Result</h1>
        {console.log(info)}
        <h2>Correct Answer</h2>
        {
            info?.data.map((queInfo: any, index: number) => {
                return <div>{index + 1}. {queInfo.option.map((ans: any) => {
                    return <>{queInfo.correct.includes(ans.id) && (ans[`${info?.lang}`] + ",")}</>
                })} </div>
            })
        }
        <h2>User Answer</h2>
        {
            info?.data.map((queInfo: any, index: number) => {
                return <div>{index + 1}. {Object.keys(info?.answer).includes(`${index + 1}`) ? (info?.answer[index + 1].map((e: any) => {
                    return <>{e.split("|", 1)},</>
                })) : "not submitted by user"
                }
                </div>
            })
        }
        <h1>Result</h1>
        {
            info?.data.map((queInfo: any, value: number) => {
                let re = "";
                   const checkArray: Array<any> = [];

                Object.keys(info?.answer).includes(`${value + 1}`) ? ((value === 4) ? (info?.answer[value + 1].map((element: any, index: any) => {

                    element.split("|").map((ops: any, num: number) => {
                        num === 1 && checkArray.push(ops);

                    })
                    re = (checkArray.length === queInfo.correct.length &&
                        checkArray.every((val: any, index: number) => val === queInfo.correct[index])) 
                    ? "true" :(checkArray.reverse(), checkArray.every((val: any, index: number) => val === queInfo.correct[index])) ?"true" : "false";
                 
                    return re;

                })) : (info?.answer[value + 1]?.every((element: any, index: any) => {

                    const result = (element.split("|", 2).map((option: any, val: number) => {
                        return val === 1 && queInfo.correct[val - 1] === option
                    }))
                    result.map((e: any, res: number) => {
                        re = (res === 1 && e)
                    })
                }))) : re = "false"

                { count = Object.keys(info?.answer).includes(`${value + 1}`) ? (value === 4 ? (re === "true" ? count + 1 : count) : (re ? count + 1 : count)) : count }
                return <div>{value + 1}. {Object.keys(info?.answer).includes(`${value + 1}`) ? (value === 4 ? (re === "true" ? "Correct" : "InCorrect") : (re ? "Correct" : "InCorrect")) : "InCorrect"}</div>
            })
        }

        <PieChart
            data={[
                { title: 'Correct', value: count, color: '#23a60f' },
                { title: 'Incorrect', value: (5 - count), color: '#ff1500' },

            ]}
            radius={20}
            totalValue={5}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={() => ({
                fontSize: '2px',
                fontFamily: 'sans-serif',
            })}
        />;
    </>
}