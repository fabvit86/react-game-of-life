// game grid component
import React, { Component } from 'react'
import ControlButton from './ControlButton'
import Cell from './Cell'
import _ from 'lodash'
import $ from 'jquery'
window.jQuery = $
window.$ = $


class Grid extends Component {
  constructor (props) {
    super(props)
    this.gameGrid = this.createGrid(this.props.rows, this.props.columns)
    this.flattedGrid = _.flatten(this.gameGrid)
    this.state = {
      generationCount: 0,
      gameState: 'play'
    }
     // default speed:
    this.speed = this.props.fastSpeed
    this.activeSpeedButton = 'fastSpeedButton'
  }
  
  createGrid (n, m) {
    let gameGrid = []
    ;for (let r = 0; r < n; r++) {
      let row = []
      ;for (let c = 0; c < m; c++) {
        row.push({
          id: `${r}${c}`,
          rowIndex: r,
          colIndex: c,
          neighbors: this.locateNeighbors(r, c, n, m),
          status: this.cellRandomStatus(),
          nextStatus: ''
        })
      }
      gameGrid.push(row)
    }
    return gameGrid
  }
  
  // return an array of neighbors for a cell:
  locateNeighbors (rowIndex, colIndex, n, m) {
    let cellNeighbors = []
    // border cells neighbors:
    if (rowIndex === 0) { // top row
      switch (colIndex) {
        case 0: // top-left cell
          cellNeighbors = [
            {id: `${n-1}${m-1}`, rowIndex: n-1, colIndex: m-1},
            {id: `${n-1}${colIndex}`, rowIndex: n-1, colIndex: colIndex},
            {id: `${n-1}${colIndex+1}`, rowIndex: n-1, colIndex: colIndex+1},
            {id: `${rowIndex}${m-1}`, rowIndex: rowIndex, colIndex: m-1}, 
            {id: `${rowIndex}${colIndex+1}`, rowIndex: rowIndex, colIndex: colIndex+1},
            {id: `${rowIndex+1}${m-1}`, rowIndex: rowIndex+1, colIndex: m-1}, 
            {id: `${rowIndex+1}${colIndex}`, rowIndex: rowIndex+1, colIndex: colIndex}, 
            {id: `${rowIndex+1}${colIndex+1}`, rowIndex: rowIndex+1, colIndex: colIndex+1}
          ]
        break
        case m-1: // top-right cell
          cellNeighbors = [
            {id: `${n-1}${colIndex-1}`, rowIndex: n-1, colIndex: colIndex-1}, 
            {id: `${n-1}${colIndex}`, rowIndex: n-1, colIndex: colIndex}, 
            {id: `${n-1}${0}`, rowIndex: n-1, colIndex: 0},
            {id: `${rowIndex}${colIndex-1}`, rowIndex: rowIndex, colIndex: colIndex-1}, 
            {id: `${rowIndex}${0}`, rowIndex: rowIndex, colIndex: 0},
            {id: `${rowIndex+1}${colIndex-1}`, rowIndex: rowIndex+1, colIndex: colIndex-1}, 
            {id: `${rowIndex+1}${colIndex}`, rowIndex: rowIndex+1, colIndex: colIndex}, 
            {id: `${rowIndex+1}${0}`, rowIndex: rowIndex+1, colIndex: 0}
          ]
        break
        default:
          cellNeighbors = [
            {id: `${n-1}${colIndex-1}`, rowIndex: n-1, colIndex: colIndex-1}, 
            {id: `${n-1}${colIndex}`, rowIndex: n-1, colIndex: colIndex}, 
            {id: `${n-1}${colIndex+1}`, rowIndex: n-1, colIndex: colIndex+1},
            {id: `${rowIndex}${colIndex-1}`, rowIndex: rowIndex, colIndex: colIndex-1}, 
            {id: `${rowIndex}${colIndex+1}`, rowIndex: rowIndex, colIndex: colIndex+1},
            {id: `${rowIndex+1}${colIndex-1}`, rowIndex: rowIndex+1, colIndex: colIndex-1}, 
            {id: `${rowIndex+1}${colIndex}`, rowIndex: rowIndex+1, colIndex: colIndex}, 
            {id: `${rowIndex+1}${colIndex+1}`, rowIndex: rowIndex+1, colIndex: colIndex+1}
          ]
        break
      }
    } else if (rowIndex === n-1) { // bottom row
      switch (colIndex) {
        case 0: // bottom-left cell
          cellNeighbors = [
            {id: `${rowIndex-1}${m-1}`, rowIndex: rowIndex-1, colIndex: m-1}, 
            {id: `${rowIndex-1}${colIndex}`, rowIndex: rowIndex-1, colIndex: colIndex}, 
            {id: `${rowIndex-1}${colIndex+1}`, rowIndex: rowIndex-1, colIndex: colIndex+1},
            {id: `${rowIndex}${m-1}`, rowIndex: rowIndex, colIndex: m-1}, 
            {id: `${rowIndex}${colIndex+1}`, rowIndex: rowIndex, colIndex: colIndex+1},
            {id: `${0}${m-1}`, rowIndex: 0, colIndex: m-1}, 
            {id: `${0}${colIndex}`, rowIndex: 0, colIndex: colIndex}, 
            {id: `${0}${colIndex+1}`, rowIndex: 0, colIndex: colIndex+1}
          ]
        break
        case m-1: // bottom-right cell
          cellNeighbors = [
            {id: `${rowIndex-1}${colIndex-1}`, rowIndex: rowIndex-1, colIndex: colIndex-1}, 
            {id: `${rowIndex-1}${colIndex}`, rowIndex: rowIndex-1, colIndex: colIndex}, 
            {id: `${rowIndex-1}${0}`, rowIndex: rowIndex-1, colIndex: 0},
            {id: `${rowIndex}${colIndex-1}`, rowIndex: rowIndex, colIndex: colIndex-1}, 
            {id: `${rowIndex}${0}`, rowIndex: rowIndex, colIndex: 0},
            {id: `${0}${colIndex-1}`, rowIndex: 0, colIndex: colIndex-1}, 
            {id: `${0}${colIndex}`, rowIndex: 0, colIndex: colIndex}, 
            {id: '00', rowIndex: 0, colIndex: 0}
          ]
        break
        default:
          cellNeighbors = [
            {id: `${rowIndex-1}${colIndex-1}`, rowIndex: rowIndex-1, colIndex: colIndex-1}, 
            {id: `${rowIndex-1}${colIndex}`, rowIndex: rowIndex-1, colIndex: colIndex}, 
            {id: `${rowIndex-1}${colIndex+1}`, rowIndex: rowIndex-1, colIndex: colIndex+1},
            {id: `${rowIndex}${colIndex-1}`, rowIndex: rowIndex, colIndex: colIndex-1}, 
            {id: `${rowIndex}${colIndex+1}`, rowIndex: rowIndex, colIndex: colIndex+1},
            {id: `${0}${colIndex-1}`, rowIndex: 0, colIndex: colIndex-1}, 
            {id: `${0}${colIndex}`, rowIndex: 0, colIndex: colIndex}, 
            {id: `${0}${colIndex+1}`, rowIndex: 0, colIndex: colIndex+1}
          ]
        break
      }
    } else if (colIndex === 0) { // border-left column
      cellNeighbors = [
        {id: `${rowIndex-1}${m-1}`, rowIndex: rowIndex-1, colIndex: m-1}, 
        {id: `${rowIndex-1}${colIndex}`, rowIndex: rowIndex-1, colIndex: colIndex}, 
        {id: `${rowIndex-1}${colIndex+1}`, rowIndex: rowIndex-1, colIndex: colIndex+1},
        {id: `${rowIndex}${m-1}`, rowIndex: rowIndex, colIndex: m-1}, 
        {id: `${rowIndex}${colIndex+1}`, rowIndex: rowIndex, colIndex: colIndex+1},
        {id: `${rowIndex+1}${m-1}`, rowIndex: rowIndex+1, colIndex: m-1}, 
        {id: `${rowIndex+1}${colIndex}`, rowIndex: rowIndex+1, colIndex: colIndex}, 
        {id: `${rowIndex+1}${colIndex+1}`, rowIndex: rowIndex+1, colIndex: colIndex+1}
      ]
    } else if (colIndex === m-1) { // border-right column
      cellNeighbors = [
        {id: `${rowIndex-1}${colIndex-1}`, rowIndex: rowIndex-1, colIndex: colIndex-1}, 
        {id: `${rowIndex-1}${colIndex}`, rowIndex: rowIndex-1, colIndex: colIndex}, 
        {id: `${rowIndex-1}${0}`, rowIndex: rowIndex-1, colIndex: 0},
        {id: `${rowIndex}${colIndex-1}`, rowIndex: rowIndex, colIndex: colIndex-1}, 
        {id: `${rowIndex}${0}`, rowIndex: rowIndex, colIndex: 0},
        {id: `${rowIndex+1}${colIndex-1}`, rowIndex: rowIndex+1, colIndex: colIndex-1}, 
        {id: `${rowIndex+1}${colIndex}`, rowIndex: rowIndex+1, colIndex: colIndex},
        {id: `${rowIndex+1}${0}`, rowIndex: rowIndex+1, colIndex: 0}
      ]
    } else {
      cellNeighbors = [
        {id: `${rowIndex-1}${colIndex-1}`, rowIndex: rowIndex-1, colIndex: colIndex-1}, 
        {id: `${rowIndex-1}${colIndex}`, rowIndex: rowIndex-1, colIndex: colIndex}, 
        {id: `${rowIndex-1}${colIndex+1}`, rowIndex: rowIndex-1, colIndex: colIndex+1},
        {id: `${rowIndex}${colIndex-1}`, rowIndex: rowIndex, colIndex: colIndex-1}, 
        {id: `${rowIndex}${colIndex+1}`, rowIndex: rowIndex, colIndex: colIndex+1},
        {id: `${rowIndex+1}${colIndex-1}`, rowIndex: rowIndex+1, colIndex: colIndex-1}, 
        {id: `${rowIndex+1}${colIndex}`, rowIndex: rowIndex+1, colIndex: colIndex}, 
        {id: `${rowIndex+1}${colIndex+1}`, rowIndex: rowIndex+1, colIndex: colIndex+1}
      ]
    }
    return cellNeighbors
  }
  
  cellRandomStatus () {
    return Math.random()>0.7 ? 'alive' : 'dead'
  }
  
  // return the number of alive neighbors cells for a given cell:
  countAliveNeighbors (cell) {
    let aliveCellsCount = 0
    cell.neighbors.forEach((currentElement) => {
      if (this.gameGrid[currentElement.rowIndex][currentElement.colIndex].status === 'alive') {
          aliveCellsCount++
      }
    })
    return aliveCellsCount
  }
  
  // change the status of a cell manually, when user clicks on it:
  changeSingleCellStatus (cell) {
    let classToAdd, classToRemove
    if (cell.status === 'alive') {
      classToAdd = 'dead'
      classToRemove = 'alive'
    } else {
      classToAdd = 'alive'
      classToRemove = 'dead'
    }
    cell.status = classToAdd
    $('#'+cell.id).removeClass(classToRemove).addClass(classToAdd)
  }
  
  // change the status of a cell based on the number of alive neighbors:
  cellChangeStatus (cell) {
    const aliveNeighbors = this.countAliveNeighbors(cell)
    let nextCellStatus = cell.status
    if (cell.status === 'alive') {
      if (aliveNeighbors < 2 || aliveNeighbors > 3){ 
        nextCellStatus = 'dead'
      }
    } else {
      if (aliveNeighbors === 3){ 
       nextCellStatus = 'alive'
      }
    }
    // update cell's next status in the gameGrid:
    cell.nextStatus = nextCellStatus
    return nextCellStatus
  }
  
  // pause/clear/play game:
  changeGameState (gameState) {
    clearTimeout(this.intervalId)
    const rerunGame = () => {
      this.runGame()
      this.intervalId = setTimeout(rerunGame, this.speed)
    }
    switch (gameState) {
      case 'play':
        rerunGame()
      break
      case 'clear':
        // to clear the board, set every cell to 'dead' status:
        this.flattedGrid.forEach((currentCell) => {
          currentCell.status = 'dead'
        })
        $(".cell").removeClass('alive').addClass('dead')
        this.setState({ generationCount: 0 })
      break
      default:
      break
    }
    this.setState({ gameState: gameState })
  }
  
  //pause the game speed:
  changeSpeed (speed) {
    switch (speed) {
      case 'slowSpeedButton':
        this.speed = this.props.slowSpeed  
      break
      case 'mediumSpeedButton':
        this.speed = this.props.mediumSpeed  
      break
      case 'fastSpeedButton':
        this.speed = this.props.fastSpeed  
      break
      default:
        this.speed = this.props.mediumSpeed 
      break

    }
  }
  
  runGame () {
    // calculate the next status for each cell:
    this.flattedGrid.forEach((currentCell) => {
      this.cellChangeStatus(currentCell)
    })
    // update the status for each cell, coping the value of nextStatus property:
    this.flattedGrid.forEach((currentCell) => {
      currentCell.status = currentCell.nextStatus
    })
    // update the generation count state variable:
    let nextGenerationCount = this.state.generationCount + 1
    this.setState({ generationCount: nextGenerationCount++ })
  }
  
  componentDidMount () {
    // set the css width of the board:
    const cellSize = 10
    const gridBorderWidth = 8
    const gridWidth = this.props.columns * cellSize + 2 * gridBorderWidth
    const gridHeight = this.props.rows * cellSize + 2 * gridBorderWidth
    $('#gameGrid').css('width', gridWidth)
    $('#gameGrid').css('height', gridHeight)
    $('#gameGrid').css('border-width', gridBorderWidth)
    // set the active buttons:
    $('#playButton').addClass('active')
    $('#'+this.props.activeGridButton).addClass('active')
    $('#'+this.activeSpeedButton).addClass('active')
    //start the game:
    if (this.state.gameState === 'play') {
      const runGameInt = () => {
        // this.startTime = new Date().getTime() // FOR TESTING
        this.runGame()
        this.intervalId = setTimeout(runGameInt, this.speed)
        // console.log('runGame took '+(new Date().getTime()-this.startTime)+' ms') //TEST
      }
      runGameInt()
    }
  } // componentDidMount
  
  // clear interval:
  componentWillUnmount () {
    clearTimeout(this.intervalId)
  }
   
  render () {
    // console.log('rendering Grid ('+this.state.generationCount+')') // TEST
    return (
      <div id='main-container'>
        <div className='controls-container' id='top-controls'>
          <div className='infoText'>Click on a cell to change its state manually.</div>
          <div>Generations: <span className='controls-span'>{this.state.generationCount}</span></div>
          <ControlButton
            key='playButton' id='playButton' classes='btn btn-outline-success gameButton' name='Play' action='play'
            onClickHandler={this.changeGameState.bind(this)} gameState={this.state.gameState}
          />
          <ControlButton
            key='pauseButton' id='pauseButton' classes='btn btn-outline-danger gameButton' name='Pause' action='pause'
            onClickHandler={this.changeGameState.bind(this)} gameState={this.state.gameState}
          />
          <ControlButton
            key='clearButton' id='clearButton' classes='btn btn-outline-warning gameButton' name='Clear' action='clear'
            onClickHandler={this.changeGameState.bind(this)} gameState={this.state.gameState}
          />
          <ControlButton
            key='randomButton' id='randomButton' classes='btn btn-secondary' name='Genarate Random Game'
            onClickHandler={this.props.newGame}
          />
        </div>
        <div id='gameGrid'>
          {this.gameGrid.map((currentRow, rowIndex) =>
            currentRow.map((currentCell) => {
              return (
                <Cell 
                  key={currentCell.id}
                  cellData={currentCell}
                  onClickHandler={this.changeSingleCellStatus.bind(this, currentCell)}
                />
              )
            })
          )}
        </div>
        <div className='controls-container' id='bottom-controls'>
          Grid Size:&nbsp; 
          <ControlButton
            key='smallGridButton' id='smallGridButton' classes='btn btn-secondary sizeButton' name='Small' action='changeGrid'
            onClickHandler={this.props.changeGridSize}
          />
          <ControlButton
            key='mediumGridButton' id='mediumGridButton' classes='btn btn-secondary sizeButton' name='Medium' action='changeGrid'
            onClickHandler={this.props.changeGridSize}
          />
          <ControlButton
            key='largeGridButton' id='largeGridButton' classes='btn btn-secondary sizeButton' name='Large' action='changeGrid'
            onClickHandler={this.props.changeGridSize}
          />
          <br></br>
          Simulation Speed:&nbsp; 
          <ControlButton
            key='slowSpeedButton' id='slowSpeedButton' classes='btn btn-secondary speedButton' name='Slow' action='changeSpeed'
            onClickHandler={this.changeSpeed.bind(this)}
          />
          <ControlButton
            key='mediumSpeedButton' id='mediumSpeedButton' classes='btn btn-secondary speedButton' name='Medium' action='changeSpeed'
            onClickHandler={this.changeSpeed.bind(this)}
          />
          <ControlButton
            key='fastSpeedButton' id='fastSpeedButton' classes='btn btn-secondary speedButton' name='Fast' action='changeSpeed'
            onClickHandler={this.changeSpeed.bind(this)}
          />
        </div>
      </div>
    )
  }
} // Grid class

export default Grid
