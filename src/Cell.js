import React, { Component } from 'react';

class Cell extends Component {
  constructor (props) {
    super(props)
    this.state = {
      status: this.props.cellData.status
    }
  }
    
  handleClick () {
    this.props.onClickHandler()
    this.setState({ status: this.props.cellData.status })
  }
    
  render () {
    return (
      <div 
        id={this.props.cellData.id}
        className={'cell '+this.props.cellData.status}
        onClick={this.handleClick.bind(this)}>
      </div>
    )
  }
} // Cell class

export default Cell
