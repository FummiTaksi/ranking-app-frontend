import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { createRanking } from '../../reducers/rankingReducer';
import Input from '../signin/Input';

const youAreNotAllowed = () => (
  <h3>
    You are not allowed to be here
  </h3>
);

class RankingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      rankingFileBase64: undefined,
      rankingFileName: '',
      rankingName: '',
      rankingDate: new Date().toString(),
    };
    this.handleFormChange = this.handleFormChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.sendFile = this.sendFile.bind(this);
  }

  onDrop(approved) {
    const droppedFile = approved[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        rankingFileBase64: event.target.result,
        rankingFileName: droppedFile.name,
      });
    };
    reader.readAsDataURL(droppedFile);
  }

  sendFile(e) {
    e.preventDefault();
    const credentials = {
      rankingFileBase64: this.state.rankingFileBase64,
      rankingName: this.state.rankingName,
      rankingDate: this.state.rankingDate
    };
    this.props.createRanking(credentials);
    this.setState({
      rankingFileBase64: undefined,
      rankingFileName: '',
      rankingName: '',
      rankingDate: '',
    });
  }

  handleFormChange(e) {
    console.log('e.target.value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  renderUploadForm() {
    if (this.state.rankingFileBase64) {
      return (
        <form onSubmit={this.sendFile}>
          <Input
            type="input"
            text="Name of ranking:"
            name="rankingName"
            value={this.state.rankingName}
            onChange={this.handleFormChange}
          />
          <Input
            type="date"
            text="Date of competition:"
            name="rankingDate"
            value={this.state.rankingDate}
            onChange={this.handleFormChange}
          />
          <button type="submit">
            Upload
          </button>
        </form>
      );
    }
    return null;
  }

  renderDroppedFileName() {
    if (this.state.rankingFileBase64) {
      const filenameText = `Filename: ${this.state.rankingFileName}`;
      return (
        <p>
          {filenameText}
        </p>
      );
    }
    return null;
  }

  renderDropzone() {
    return (
      <div id="fileDrop">
        <h3>
          Drop excel file to create new ranking
        </h3>
        <Dropzone
          className="field upload-box"
          onDrop={this.onDrop}
          multiple={false}
          accept=".xls"
        >
          <div className="field" style={{ borderStyle: 'dashed' }}>
            <p className="upload-p">
              Click to navigate to the file or drag and drop them here.
            </p>
            <br />
          </div>
        </Dropzone>
      </div>
    );
  }

  renderFileUploadingForm() {
    return (
      <div>
        {this.renderDropzone()}
        {this.renderDroppedFileName()}
        {this.renderUploadForm()}
      </div>
    );
  }

  render() {
    const { admin } = this.props.credentials;
    return (
      <div>
        {admin && this.renderFileUploadingForm()}
        {!admin && youAreNotAllowed()}
      </div>
    );
  }
}

const mapDispatchToProps = {
  createRanking,
};

const mapStateToProps = state => ({ credentials: state.login });

const connectedRankingForm = connect(mapStateToProps, mapDispatchToProps)(RankingForm);

export default connectedRankingForm;
