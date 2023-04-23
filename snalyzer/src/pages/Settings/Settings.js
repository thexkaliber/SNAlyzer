import React,{useState} from 'react';
import axios from 'axios';
import '../../App.css';


const Settings = () => {

    const [resetMsg, setResetMsg] = useState('');
    const [updateMsg, setUpdateMsg] = useState('');

    const resetLogs =  async () =>{
        const resetPac = await axios.get('http://localhost:5001/resetlogs', {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        });
        let resetmsg = resetPac.data;
        resetmsg = String(resetmsg) 
        setResetMsg(resetmsg)
    }

    const checkUpdates =  async () =>{
        const updatePac = await axios.get('http://localhost:5001/checkupdates', {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        });
        let updatemsg = updatePac.data;
        updatemsg = String(updatemsg) 
        setUpdateMsg(updatemsg)
    }

    return (
        <div className='fadeUp'>
            <h1>Settings</h1>
            <br></br>
            <br></br>
            <h2>Customization Settings</h2>
            <br></br>
            <p><button className='Bttn'>Dark Mode</button></p>
            <br></br>
            <br></br>
            <h2>Scrapper Settings</h2>
            <br></br>
            <p><button className='Bttn' onClick={checkUpdates}>Check for updates</button> {updateMsg}</p>
            <br></br>
            <p><button className='Bttn'onClick={resetLogs}>Reset Logs</button> {resetMsg}</p>
            <br></br>
            <br></br>
            <h2>Model Settings</h2>
            <br></br>
            <p><button className='Bttn'>Load Model</button></p>
            <br></br>
            <p><button className='Bttn'>Delete Model</button></p>
            <br></br>
        </div>
    );
};

export default Settings;