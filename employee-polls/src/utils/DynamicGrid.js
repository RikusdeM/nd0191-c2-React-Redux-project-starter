import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const DynamicGrid = ({ colCount, children, md }) => {
    let rowCount = Math.ceil(children.length / colCount);

    let index = 0;

    const buildGrid = () => {
        return renderRows();
    };

    const renderRows = () => {
        let rows = [];
        for (let row = 0; row < rowCount; row++) {
            rows.push(
                <Row className='Row' key={row}>
                    {renderCols()}
                </Row>
            );
        }
        return rows;
    };

    const renderCols = () => {
        let cols = [];
        for (let col = 0; col < colCount; col++) {
            if (index < children.length) {
                cols.push(
                    <Col className='Col' md={md} key={index}>
                        {children[index]}
                    </Col>
                );
                index++;
            }
        }
        return cols;
    };

    return (
        <Container className='Container'>
            {buildGrid()}
        </Container>
    );
};

export default DynamicGrid;
