import React from 'react';

export default function PokeRow(props){
        return (
            <tr>
                <td>
                    <img alt={props.mon.name} height={40} width={40} src={props.mon.img}/>
                </td>
                <td>{props.mon.name}</td>
                <td>{props.mon.type.join(', ')}</td>
                <td>{props.mon.weaknesses.join(', ')}</td>
                { /* eslint-disable-next-line*/ }
                <td><a href='#' onClick={() => props.handleDetailsClick(props.mon)}>details</a></td>
            </tr>
        )
}