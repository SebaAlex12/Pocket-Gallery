import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { uploadFile } from '../../actions/fileActions'
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

class FileUploadForm extends Component {
    constructor(props) {
        super(props);
        // this.onSubmit = this.onSubmit.bind(this);
        this.setState({
          uploading: false,
          path:'',
          files:[]
        })
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
        this.setState({ uploading: true});
        let formData = new FormData();
        const config = {
          header: { 'content-type': 'multipart/from-data' }
        }

        // acceptedFiles.map(file => {
        //     file.dest = 'image';
        //     return file;
        // })

        formData.append("dest","image");
        formData.append("file", acceptedFiles[0]);
        
        // const data = formData.getAll('file');
        // console.group('plik');
        //    console.log(data);
        // console.groupEnd();

        this.props.uploadFile(formData);
    }

    render() {
        return (
          <form action="" enctype="multipart/form-data">
          <Dropzone onDrop={this.onDrop}>
            {({getRootProps, getInputProps, isDragActive}) => {
              return (
                
                               <div
                  {...getRootProps()}
                  className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                >
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop files here...</p> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div> 
                
              )
            }}
          </Dropzone>
          </form>
        );
      }
}

FileUploadForm.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { uploadFile }
  )(FileUploadForm);