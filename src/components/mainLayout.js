import React, {useState, useEffect, useRef} from 'react';

//Subcompoentes
import Board from './board';
import ColorPalette from './colorPalette'

//Datos de la primera carga de la app
const DAY_ZERO_MATRIX = Array(10).fill(Array(10).fill('#ffffff'));

function MainLayout() {
    //Hooks y estado
    let [colorChosen, setColor] = useState('#000000');
    let [colorGrid, setColorGrid] = useState(
        window.localStorage.getItem('pintable') ? JSON.parse(localStorage.getItem('pintable')) : DAY_ZERO_MATRIX
    );

    const pintable = useRef();

    //Efecto secundario: Almacenmaiento en local storage
    useEffect(()=>window.localStorage.setItem('pintable',JSON.stringify(colorGrid)))

    return (
        <Board cells={colorGrid}/>
    )
}

export default MainLayout;