import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

export default function PokeRow(props){
        return (
            <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={props.handleSearchChange}
                        placeholder="Pokemon Name"
                        aria-label="Pokemon Name"
                    />
            </InputGroup>
        )
}