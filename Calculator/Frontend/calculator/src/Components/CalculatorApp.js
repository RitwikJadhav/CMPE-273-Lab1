import React, { Component } from 'react';
import ResultWindow from './ResultWindow';
import 'bootstrap/dist/css/bootstrap.css';
import Button from './Button';
import axios from 'axios'; 

const containerStyle = {
    backgroundColor : '#F5EDEB',
    width : '400px',
    height: '300px',
    marginTop: '50px',
    borderRadius: '10px'
};

class Calculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resultantExpression : ""
        }

        this.onClickChange = this.onClickChange.bind(this);
        this.onEvaluation = this.onEvaluation.bind(this);
        this.onSingleDelete = this.onSingleDelete.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onClickChange = (value) => {
       this.setState({ 
           resultantExpression : this.state.resultantExpression + value
        });
    }

    onEvaluation = (e) => {
        const resultantValue = {
            resultantExpression : this.state.resultantExpression
        }
        //console.log(this.state.resultantExpression);
        axios.post('http://localhost:3001/results',resultantValue)
        .then(response => {
            console.log(response.status);
            if(response.status === 200) {
                console.log('Result is calculated');
                console.log(response.data);
                this.setState({
                    resultantExpression : response.data
                })
            }
        })
    }

    onSingleDelete = () => {
        this.setState({
            resultantExpression : this.state.resultantExpression.slice(0,-1)
        })
    }

    onDelete = () => {
        this.setState({
            resultantExpression : ""
        })
    }

    render() {
        return(
            <div>
                <h1>Welcome to the Calculator app</h1>
                <div className = "container" style={containerStyle}>
                    <ResultWindow resultantExpression = {this.state.resultantExpression}/>
                    <br/>
                    <br/>
                    <Button value = "1" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "2" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "3" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "4" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "5" onClickChange={this.onClickChange}/>
                    <br/>
                    <br/>  
                    <Button value = "6" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "7" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "8" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "9" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "0" onClickChange={this.onClickChange}/>
                    <br/>
                    <br/> 
                    <Button value = "+" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "-" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "*" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <Button value = "/" onClickChange={this.onClickChange}/>
                    &nbsp;
                    <button className = "btn btn-outline-secondary" onClick={this.onSingleDelete}>CE</button>
                    &nbsp;
                    <button className = "btn btn-outline-secondary" onClick={this.onDelete}>C</button>
                    &nbsp;
                    <button className = "btn btn-outline-secondary" onClick={this.onEvaluation}>=</button>
                </div>    
            </div> 
        );
    }
}

export default Calculator;