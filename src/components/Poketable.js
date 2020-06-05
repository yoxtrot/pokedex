import React from 'react';
import Table from 'react-bootstrap/Table';
import PokeRow from './Pokerow';

export default function PokeTable(props){
    return(
        <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Weakness</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.pokemon.map(mon => (
                        <PokeRow key={mon.name} mon={mon} handleDetailsClick={props.handleDetailsClick}/>
                    ))}
                </tbody>
            </Table>
    )
}