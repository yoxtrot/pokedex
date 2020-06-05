import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function FilterCard(props){
    return (
        <Card>
                    <Card.Title>
                        {props.title}
                    </Card.Title>
                    <Card.Body>
                        <Form.Group controlId="formBasicCheckbox">
                            {props.items ? <div className='row'>
                                {props.items.map((item) => 
                                <div key={item} style={{paddingRight: '10px'}}>
                                    <Form.Check value ={item} onChange={props.handleCheck} type="checkbox" label={item}/>
                                </div>
                                )}
                            </div>
                            
                            : null }
                        </Form.Group>
                    </Card.Body>
                </Card>
    )
}