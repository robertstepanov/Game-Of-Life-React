import React from 'react';
import {
  ButtonToolbar,
  MenuItem,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';

class Buttons extends React.Component {
  handleSelect = (event) => {
    this.props.gridSize(event);
  };

  render() {
    return (
      <div className='center'>
        <ButtonToolbar className='toolbar'>
          <DropdownButton
            className='dropdown-item-button'
            title='Grid Size'
            id='size-menu'
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey='1'>20x10</Dropdown.Item>
            <br></br>
            <Dropdown.Item eventKey='2'>50x30</Dropdown.Item>
            <br></br>
            <Dropdown.Item eventKey='3'>70x50</Dropdown.Item>
          </DropdownButton>
          <button className='btn btn-default' onClick={this.props.seed}>
            Random
          </button>
          <button className='btn btn-default' onClick={this.props.playButton}>
            Play
          </button>
          <button className='btn btn-default' onClick={this.props.stopButton}>
            Stop
          </button>
          <button className='btn btn-default' onClick={this.props.slow}>
            Slow Down
          </button>
          <button className='btn btn-default' onClick={this.props.fast}>
            Speed Up
          </button>
          <button className='btn btn-default' onClick={this.props.clear}>
            Clear
          </button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
