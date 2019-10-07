import React, { Component } from 'react';

const resultWindowStyle = {
    marginTop : '30px',
    borderRadius: '3px'
}

class ResultWindow extends Component {
    render() {
        return(
            <div>
                <input type = "text" pattern = "[0-9]" required style = {resultWindowStyle} value = {this.props.resultantExpression} />
            </div>    
        )
    }
}

export default ResultWindow;