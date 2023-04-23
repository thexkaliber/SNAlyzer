import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FormData from 'form-data';
import axios from 'axios';
import './Upload.css';
import {RxCross1} from 'react-icons/rx';
import { ImageConfig } from '../../config/ImageConfig'; 
import uploadImg from '../../assets/images/cloud-upload-regular-240.png';
import '../../App.css';

const Upload = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    const handleSubmission = async (e) =>{
        for(let i=0; i<fileList.length;i++)
        {
        const formData = new FormData();
        formData.append('file',fileList[i]);
        const res = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }   
        }
        )
        console.log(res)
        await new Promise(r => setTimeout(r, 200));
    }
         
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Drag & Drop your files here.<br></br>Do not upload files with duplicate names.</p>
                </div>
                <input type="file" value="" onChange={onFileDrop} accept='.json,.csv'/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}><RxCross1/></span>
                                </div>
                            ))
                            
                        }
                        
                        <div className='centerBttn'><button className='Bttn' onClick={handleSubmission}>Upload</button></div>
                    </div>
                    
                ) : null
            }
        </>
    );
}

Upload.propTypes = {
    onFileChange: PropTypes.func
}

export default Upload;
