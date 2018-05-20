import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'

class RankingForm extends React.Component {

    constructor() {
        super()
        this.state = {
            file: undefined
        }
    }


    onDrop = (approved, rejected) => {
        console.log('approved', approved)
        const droppedFile = approved[0]
        console.log('DROPPED FILE', droppedFile)
        this.setState({
            file: droppedFile
        })
    }


    renderDropzone() {
        return (
            <div>
              <h3>Drop excel file to create new ranking </h3>
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
        )
    }

    renderDroppedFileName() {
      if (this.state.file) {
        return (
            <p>Filename: {this.state.file.name}</p>
        )
      }
    }

    renderUploadForm() {
        if (this.state.file) {
            return (
                <button onClick = {() => this.sendFile()}>Upload </button>
            )
        }
    }

    renderFileUploadingForm() {
        return(
            <div>
                {this.renderDropzone()}
                {this.renderDroppedFileName()}
                {this.renderUploadForm()}
            </div>
        )
    }

    sendFile() {
        console.log('SENDING FILE', this.state.file)
        this.setState({
            file: undefined
        })
    }



    render() {
        const admin = this.props.credentials.admin
        return (
            <div>
            {admin && this.renderFileUploadingForm()}
            {!admin && <h3>You are not allowed to be here</h3>}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        credentials: state.login
    }
}

const connectedRankingForm = connect(mapStateToProps)(RankingForm)

export default connectedRankingForm