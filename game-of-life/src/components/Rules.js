import React from "react";

export default function Rules() {
  return (
    <div className='rules'>
        <h2 className='rules'>Rules</h2>
        <h3 className='rules'>1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.</h3>
        <h3 className='rules'>2. Any live cell with two or three live neighbours lives on to the next generation.</h3>
        <h3 className='rules'>3. Any live cell with more than three live neighbours dies, as if by overpopulation.</h3>
        <h3 className='rules'>4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</h3>
        <h4>Learn more: <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Wikipedia</a></h4>
    </div>
  );
}