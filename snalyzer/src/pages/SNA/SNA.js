import React,{useState} from 'react';
import SNAContainer from '../../components/SNAContainer/SNAContainer';
import Dropdown from '../../components/Dropdown/Dropdown';
import '../../App.css';

const SNA = () => {
    const [path, setPath] = useState('2023_all');
    const handlePath = (pth ='2023_all') => {
        setPath(pth)
    }
    return (
        <div>
            <h1>SNA</h1>
            <Dropdown handlepath={handlePath}/>
            <SNAContainer width={"100%"} height={"100vh"} data={path} />
        </div>
    );
};

export default SNA;