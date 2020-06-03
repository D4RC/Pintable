import React from 'react';
import PropTypes from 'prop-types';

function Board(props) {
    const {
        cells,
        onPaint
    } = props;

    return (
        <div>
            <div>
                {cells && cells.map((row,i) => (
                    <div className="flex h-12" key={`row${i}`}>
                    {row.map((col,j) => (
                        <div className="w-12 h-12 border border-gray-300" key={`cell${j}`}>
                            {col}
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        </div>
    )

} 



export default Board;