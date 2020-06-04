import React, {useState} from 'react';
import PropTypes from 'prop-types';

function ColorPalette(props) {
    const{
        mainColour,
        onChange,
    } = props;

    //Estado de la petición
    const [status, setStatus] = useState('idle');

    //Estado de los colores, con colores por default
    const [colours, setColours] = useState(['#000000', '#ffffff']);

    const [error, setError] = useState(null);

    //Petición a la Hexbot API
    function getColors() {
        setStatus('loading');
        fetch('http://api.noopschallenge.com/hexbot?count=10').then(
            (response) => {
                if(!response.ok) {
                    throw new Error(`Newtwork response not ok, status code: ${response.status}`)
                }
                return response.json();
            }
        ).then(
            data => {
                setStatus('resolved');
                setColours(data.colors.map(a=>a.value));
            }
        ).catch(
            error => {
                setStatus('rejected');
                setError(error.message);
                console.error('Problem with fetch operation;', error);
            }
        );
    }

    function buttonDisplay() {
        if(status==='loading')
            return (<div className="loader ease-linear rounded-full border-4 border-t-2 border-gray-200 h-8 w-8"></div>)
        else if(status==='idle')
            return (<div className="rounded-full border-4 border-t-2 border-gray-200 h-8 w-8">P</div>)
        else if(status==='resolved')
            return (<div className="rounded-full border-4 border-t-2 border-gray-200 h-8 w-8">V</div>)
    }

    return (
        <div className="flex justify-between items-center">
            <p> Choose your colors to begin with </p>
            <div className="flex justify-end">
            <button className="bg-white h-16 w-16 m-2 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={getColors}
            >
                P
            </button>
                {colours.map(colour => {
                    const isSelected = colour === mainColour;
                    return (
                        <div
                            key={colour}
                            style={{backgroundColor: colour}}
                            className={`h-16 w-16 m-2 border border-black rounded ${isSelected ? 'color--selected' : ''}`}
                            onClick={() => onChange(colour)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ColorPalette;