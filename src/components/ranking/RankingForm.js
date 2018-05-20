import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { createRanking } from '../../reducers/rankingReducer'
import Input from '../signin/Input'

class RankingForm extends React.Component {

    constructor() {
        super()
        this.state = {
            rankingFile: undefined,
            rankingName: ''
        }
    }


    onDrop = (approved, rejected) => {
        const droppedFile = approved[0]
        this.setState({
            rankingFile: droppedFile
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
      if (this.state.rankingFile) {
        return (
            <p>Filename: {this.state.rankingFile.name}</p>
        )
      }
    }

    renderUploadForm() {
        if (this.state.rankingFile) {
            return (
                <form onSubmit={this.sendFile}>
                  <Input
                    type = "input"
                    text = "Name of ranking:" 
                    name = "rankingName"
                    value = {this.state.rankingName}
                    onChange = {this.handleFormChange}
                   />  
                  <button type="submit">Upload</button>
                </form>
            )
        }
    }

    sendFile = (e) => {
        e.preventDefault()
        const credentials = {
            file: this.state.rankingFile,
            name: this.state.rankingName
        }
        this.props.createRanking(credentials)
        this.setState({
            rankingFile: undefined,
            rankingName: ''
        })
    }

    handleFormChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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

const mapDispatchToProps = {
    createRanking
}
const mapStateToProps = (state) => {
    return {
        credentials: state.login
    }
}

const connectedRankingForm = connect(mapStateToProps, mapDispatchToProps)(RankingForm)

export default connectedRankingForm