import React, {useState, useEffect, useRef} from 'react';

//Subcompoentes
import Board from './board';
import ColorPalette from './colorPalette'

 //Datos de la primera carga de la app
const DAY_ZERO_MATRIX = Array(10).fill(Array(10).fill('#ffffff'));

function MainLayout() {
    //Hooks y estado
    const [colorChosen, setColor] = useState('#000000');
    const [colorGrid, setColorGrid] = useState(
        window.localStorage.getItem('pintable') ? JSON.parse(localStorage.getItem('pintable')) : DAY_ZERO_MATRIX
    );

    //Referencias para la captura de pantalla / Impresión
    const pintable = useRef();
    const capture = useRef();

    //Efecto secundario: Almacenmaiento en local storage
    useEffect(()=>window.localStorage.setItem('pintable',JSON.stringify(colorGrid)))

    //Actualiza el estado, con la modificación de la celda pintada
    function onPaint(row,col){
        const newGrid = [...colorGrid];
        newGrid[row][col] = colorChosen;
        setColorGrid(newGrid);
    }

    //Resetea el tablero a blanco
    function onReset() {
        let newM = [...colorGrid];
        for(let i=0; i<10; i++)
            for(let j=0; j<10; j++)
                newM[i][j]='#ffffff';
        setColorGrid([...newM]);
    }

    //Función para la captura del componente del tablero
    /*
    function onPrint(){
        // Removes borders to get a clean .png
        setIsPrinting(true);
        pintable.current.classList.add("board--clean");

        html2canvas(pintable.current).then(canvas => {
            pintable.current.classList.remove("board--clean");
            
            capture.current.innerHTML = '';
            capture.current.appendChild(canvas);

            setIsPrinting(false);
        });
    }
    */

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-row w-full mb-4 justify-around">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                    onClick={onReset}
                >
                    New game 
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                    //onClick={onPrint}
                >
                    Print
                </button>
                <ColorPalette
                    mainColour={colorChosen}
                    onChange={setColor} 
                />
            </div>
            <div className="flex flex-row w-full justify-around mt-16">
                <div ref={capture} id="capture" className="bg-gray-200">
                    <div className="empty-state" />
                    <p className="my-4">There's no image to print. Draw something</p>
                    <button
                        className="btn btn--blue mr-2"
                        type="button"
                        //onClick={onPrint}
                    >
                        Print
                    </button>
                </div>
                <Board 
                    cells={colorGrid} 
                    onPaint={onPaint}
                >
                </Board>
            </div>
        </div>
    )
}

export default MainLayout;