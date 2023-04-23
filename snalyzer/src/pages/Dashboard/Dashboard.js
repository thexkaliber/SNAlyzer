import React from 'react';
import SentimentFrequecy from '../../components/Charts/SentimentFrequency';
import DemoSensitive from '../../components/Charts/DemoSensitive';
import MinistryFrequency from '../../components/Charts/MinistryFrequency';
import WordCloud from '../../components/Charts/WordCloud';
import OppositionParties from '../../components/Charts/OppositionParties';
import FederalRate from '../../components/Charts/FederalRate';
import './Dashboard.css';
import '../../App.css';

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
          <div className='sentimentQues'>
          <div className='sentimentChart'>
            <SentimentFrequecy/>
            </div>
            <div className='QuesChange'>
            <DemoSensitive/>
            </div>
            <div className='sentimentChart'>
            <OppositionParties/>
            </div>
            </div>
            <div className='FrequencyCloud'>
            <div className='Frequency'>    
            <MinistryFrequency/>
            </div>
            <div className='CloudFederal'>
            <WordCloud/>
            <FederalRate/>
            </div>
            </div>
            </div>
    );
};

export default Dashboard;