import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function PokeModal(props){
    if(props.pokemon !== null) {
        return (
            <Modal show={props.showModal} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.pokemon.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <img alt={props.pokemon.name} height={100} width={100} src={props.pokemon.img}/>
                        <ul>
                            <li>Number: {props.pokemon.num}</li>
                            <li>Type: {props.pokemon.type.join(', ')}</li>
                            <li>Weakness: {props.pokemon.weaknesses.join(', ')}</li>
                            <li>Height: {props.pokemon.height}</li>
                            <li>Weight: {props.pokemon.weight}</li>
                            <li>Previous Evolution: {props.pokemon && props.pokemon.prev_evolution ?props.pokemon.prev_evolution.map((pokemon) => (
                                // eslint-disable-next-line
                                <a key={pokemon.num} onClick={() => props.updatePokemon(pokemon.num)} href='#' style={{paddingRight: '10px'}}>{pokemon.name}</a>
                            )): null} </li>
                            <li>Next Evolution: {props.pokemon && props.pokemon.next_evolution ?props.pokemon.next_evolution.map((pokemon) => (
                                // eslint-disable-next-line
                                <a key={pokemon.num} onClick={() => props.updatePokemon(pokemon.num)} href='#' style={{paddingRight: '10px'}}>{pokemon.name}</a>
                            )): null} </li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        return <></>
    }
}