import React from 'react';

class Box extends React.Component {
  // Makes boxes clickable
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component {
  // Creates grid and adds boxes to columns and rows
  render() {
    const width = this.props.cols * 14;
    var rowsArr = [];
    var boxClass = '';
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + '_' + j;
        // Assigns id to boxes that allow them to be selected and turned on or off
        boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }

    return (
      <div className='grid' style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

export default Grid;
