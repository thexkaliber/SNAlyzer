import React from 'react';
import ParseCSV from '../../components/ParseCSV/ParseCSV';
import Bills from '../../components/Bills/Bills';
import OpenCPU from '../../components/OpenCPU/OpenCPU';
import Choropleth from '../../components/Charts/Choropleth';
import './Analytics.css'
import '../../App.css';

const Analytics = () => {
    return (
        <div>
            <h1>Analytics</h1>
            <br></br>
            <div className='choroCSV fadeUp'>
            <div className='choroContainer'>
            <Choropleth/>
            </div>
            <div className='csvContainer'>
            <ParseCSV/>
            </div>
            </div>
            <OpenCPU/>
            <Bills/>
        </div>
    );
};

export default Analytics;