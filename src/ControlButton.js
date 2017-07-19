// stateless, functional component rappresenting a button
import React from 'react'
import $ from 'jquery'
window.jQuery = $
window.$ = $

const ControlButton = ({id, classes, onClickHandler, name, action, gameState}) => {
  const handleClick = () => {
    let buttonsToDisactivate = ''
    switch (action) {
      case 'play':
        if (gameState !== 'play') {
          onClickHandler('play')
          buttonsToDisactivate = 'gameButton'
        }
      break
      case 'pause':
        if (gameState === 'play') {
          onClickHandler('pause')
          buttonsToDisactivate = 'gameButton'
        }
      break
      case 'clear':
        onClickHandler('clear')
        buttonsToDisactivate = 'gameButton'
      break
      case 'changeGrid':
        onClickHandler(id)
        buttonsToDisactivate = 'sizeButton'
      break
      case 'changeSpeed':
        onClickHandler(id)
        buttonsToDisactivate = 'speedButton'
      break
      default:
      break
    }
    $('.'+buttonsToDisactivate).removeClass('active')
    $('#'+id).addClass('active')
  }

  return (
    <button 
      id={id} 
      className={classes} 
      onClick={action === undefined ? onClickHandler : handleClick}>
      {name}
    </button>
  )
} // ControlButton component

export default ControlButton
