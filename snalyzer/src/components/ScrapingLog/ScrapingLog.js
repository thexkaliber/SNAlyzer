import React,{useEffect, useState} from 'react';
import axios from 'axios';
import  { RxInfoCircled } from 'react-icons/rx';
import { IconContext } from 'react-icons/lib';
import './ScrapingLog.css'
import '../../App.css';

const ScrapingLog = () => {

    const [logMsg,setlogMsg] = useState();

    let fetchData = async() => {
        let respPac = await axios.get('http://localhost:3000/scrapping_logs.log');
        let resp = await respPac.data;
        let logmsg = String(resp)
        let setlogmsg = [];
        setlogmsg = [...logmsg.split("\n").filter(line => line.includes('Scraping Event'))];
        setlogmsg.reverse()
        if (setlogmsg.length > 4){
            setlogmsg.length = 4
        }
        setlogMsg(setlogmsg)
    }

    useEffect(()=>{
        fetchData();
    },[logMsg])

    return (
        <div>
            {logMsg?.map((logs) =>{
                return(<div className='logMsgs'><IconContext.Provider value={{color:'blue',size:'20px'}}>
                    <RxInfoCircled/></IconContext.Provider><br></br><br></br>{logs}</div>)
            })}
        </div>
    );
};

export default ScrapingLog;