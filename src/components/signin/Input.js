import React from 'react'

class Input extends React.Component {

    render() {
        return (
            <div>
                {this.props.text}
                <input 
                  type = {this.props.type}
                  name = {this.props.name}
                  value = {this.props.value}
                  onChange = {this.props.onChange}
                />
            </div> 
        )
    }
}

export default Input