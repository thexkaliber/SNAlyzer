import React from 'react';
import Upload from '../../components/Upload/Upload';
import ScrapingLog from '../../components/ScrapingLog/ScrapingLog';
import './DataHandling.css';
import '../../App.css';

const DataHandling = () => {
    const onFileChange = (files) => {
        console.log(files);
    }
    return (
        <div className='dataHandler'>
            <h1>Data Handling</h1>
            <br></br>
            <div className='Handlers fadeUp'>
            <div className='scrapingLogs box'>
            <h2>Scraping Logs</h2>
            <h3>Recent Activity</h3>
            <br></br>
            <ScrapingLog/>
            </div>
            <div className='uploadHandler box'>
            <h2>Upload files</h2>
            <br></br>
            <Upload onFileChange={(files) => onFileChange(files)}/>  
            </div>  
            </div>

        </div>
    );
};

export default DataHandling;