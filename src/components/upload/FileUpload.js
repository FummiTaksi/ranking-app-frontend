import React from 'react'
import { connect } from 'react-redux'

class FileUpload extends React.Component {


    render() {
        const admin = this.props.credentials.admin
        return (
            <div>
            {admin && <h3>Drop excel file to create new ranking </h3>}
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

const connectedFileUpload = connect(mapStateToProps)(FileUpload)

export default connectedFileUpload