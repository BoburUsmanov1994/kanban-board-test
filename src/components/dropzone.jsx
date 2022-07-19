import React from 'react';
import {useDropzone} from 'react-dropzone';
import {isEmpty, get} from "lodash";

const Dropzone = (props) => {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    const files = acceptedFiles.map(file => (
        <li key={get(file, 'path')}>
            {get(file, 'path')}
        </li>
    ));


    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {isEmpty(acceptedFiles) ? <p className={'select__file'}>Select file</p> : files}
            </div>
        </section>
    );
}

export default Dropzone;