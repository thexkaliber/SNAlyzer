import React,{useState, useEffect} from 'react';
import Papa from 'papaparse';
import './Bills.css'
import '../../App.css';


const Bills = () => {
    
    const [columnArray, setColumn] = useState();
    const [values, setValues] = useState([]);
    const [query, setQuery] = useState('');
    useEffect(()=>{
        Papa.parse('/BillSearch.csv',{
            header:true,
            download: true,
            skipEmptyLines:true,
            complete: function (results) {
                const columnArray = [];
                const valuesArray = [];

                results.data.map((d) => {
                    columnArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });
                setColumn(columnArray[0]);
                setValues(valuesArray);
            }

        },)
            
    },[values])

    const handleSearchQuery = (event) =>{
        setQuery(String(event.target.value));
    }

    return (

        <div className='box'
        style={{marginTop:'10px', marginBottom:'10px'}}>
            <h3>Bills</h3>
            <br></br>
            <p>Search for Bills</p>
            <br></br>
            <div className='search-container'>
            <input className='search-box' type='text' placeholder='Enter Query to Search' onChange={handleSearchQuery}/>
            </div>
            <table className='bill-table'>
            <thead>
                <tr>
                {columnArray?.map((col, i)=> (
                    <th key={i}>{col}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {values?.filter((values) => values[2].includes(query)).slice(0,5).map((v,i) =>(
                    <tr key={i}>
                        {v?.map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
            </table>
            
        </div>
    );
};

export default Bills;