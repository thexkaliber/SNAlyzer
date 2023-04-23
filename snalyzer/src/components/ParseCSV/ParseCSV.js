import React,{useState, useEffect} from 'react';
import Papa from 'papaparse';
import './ParseCSV.css';
import '../../App.css';
const ParseCSV = () => {
    const [data,setData] = useState();
    const [columnArray, setColumn] = useState();
    const [values, setValues] = useState([]);
    useEffect(()=>{
        Papa.parse('/uploads/data.csv',{
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
                setData(results.data)
                setColumn(columnArray[0]);
                setValues(valuesArray);
            }

        })
            
    })
    return (

        <div className='box'
        style={{marginTop:'10px', marginBottom:'10px'}}>
            <h3>Uploaded Data</h3>
            <br></br>
            <p>The data you uploaded will be displayed here.</p>
            <p>Make sure that the data you have uploaded has the columns <b>'State'</b> and <b>'Values'.</b></p>
            <br></br>
            <table className='upload-table'>
            <thead>
                <tr>
                {columnArray?.map((col, i)=> (
                    <th key={i}>{col}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {values?.slice(0,11).map((v,i) =>(
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

export default ParseCSV;