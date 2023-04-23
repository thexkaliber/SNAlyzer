import React,{ useState } from 'react';
import axios from 'axios';
import {ImSpinner8} from 'react-icons/im'
import '../../App.css';

function OpenCPU() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    text:'This is disastrous',
    model: 'transformers'
  })
  const [predictionLabel, setPredictionLabel] = useState([]);
  const [predictionScore, setPredictionScore] = useState([]);
  const onChangeHandler = (event) => {

    console.log(event)
      setFormData(() => ({
        ...formData,
        [event.target.name]: event.target.value
      }))

  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(formData)
    setLoading(true)
    const params = {data: String(formData.text)}
    let respPac = await axios.post(`http://localhost:5656/ocpu/library/snalyzer/R/prediction_${String(formData.model)}/json`, params);

    let resp = await respPac.data;
    console.log(resp)
    if (resp[0] && resp[1]){
        if (resp[0] === 'LABEL_0')
        {
            setPredictionLabel('NEGATIVE')
        }
        if (resp[0] === 'LABEL_1')
        {
            setPredictionLabel('NEUTRAL') 
        } 
        if (resp[0] === 'LABEL_2')
        {
            setPredictionLabel('POSITIVE') 
        }   
        
        setPredictionScore(resp[1])
        setLoading(false)
    }
    if (resp[0].label && resp[0].score){
        if (resp[0].label[0] === 'LABEL_0')
        {
            setPredictionLabel('NEGATIVE')
        }
        if (resp[0].label[0] === 'LABEL_1')
        {
            setPredictionLabel('NEUTRAL') 
        } 
        if (resp[0].label[0] === 'LABEL_2')
        {
            setPredictionLabel('POSITIVE') 
        }   
        setPredictionScore(resp[0].score)
        setLoading(false)
    }
  }
  return (
    <div className="box"
    style={{marginTop:'10px', marginBottom:'10px'}}>
        <h3>Sentiment Analysis</h3>
        <br></br>
        <p>Perform Sentiment Analysis on your own text.</p>
        <br></br>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group search-container">
          <label htmlFor="text" className="form-label">Text: </label>
          <input className="search-box" name="text" onChange={onChangeHandler} value={formData.text} />
        </div>
        <div className="form-group">
          <label htmlFor="model" className="form-label">Model: </label>
          <div>
            <div>
              <input type="radio" name="model" value="transformer" onChange={onChangeHandler} checked={formData.model === 'transformer'} />
              <label htmlFor="transformer"> Transformers</label>
            </div>
            <div>
              <input type="radio" name="model" value="keras" onChange={onChangeHandler} checked={formData.model === 'keras'} />
              <label htmlFor="keras"> Keras</label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <button className="Bttn" type="submit" >Submit</button> 
          {loading && <ImSpinner8 className='spinner'/> }
        </div>
      </form>
        <p>The prediction by <b>{formData.model}</b> is <b>{predictionLabel}</b> with a score of <b>{predictionScore}</b></p>
    </div>
  );
}

export default OpenCPU;
