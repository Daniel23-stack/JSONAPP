import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

const itemsPerPage = 30;
const paginationRange = 5; // Determines how many pagination items to show

const MySinglePage = () => {
    const [data, setData] = useState({ Timeline: [] });
    const [activePage, setActivePage] = useState(1);
    const [paginationNumber, setPaginationNumber] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php');
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    // Calculate start and end index for pagination
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Calculate pagination
    const totalPages = Math.ceil(data.Timeline.length / itemsPerPage);

    // Calculate start and end for pagination items
    const startPagination = (paginationNumber - 1) * paginationRange + 1;
    const endPagination = startPagination + paginationRange - 1;

    // Add pagination items
    let paginationItems = [];
    for (let number = startPagination; number <= Math.min(endPagination, totalPages); number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === activePage} onClick={() => setActivePage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    const canPaginateNext = endPagination < totalPages;
    const canPaginatePrev = paginationNumber > 1;

    return (
        <Container fluid>
            <Row>
                <h1>Timeline Data:</h1>
                {data.Timeline.slice(startIndex, endIndex).map(item => (
                    <Col sm={12} md={6} lg={4} xl={3}  key={item.Id}>
                        <Card className="m-3 shadow" style={{ flex: '1 0 auto' }}>
                            <Card.Img
                                variant="top"
                                src={`https://arthurfrost.qflo.co.za/${item.Image}`}
                                className="w-100 h-50 object-fit-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "path/to/fallback/image.png";
                                }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title>{item.Title}</Card.Title>
                                <Card.Text>
                                    <strong>Media:</strong> {item.Media}<br/>
                                    <strong>Episode:</strong> {item.Episode}<br/>
                                    <strong>Status:</strong> {item.Status}<br/>
                                    <strong>Category:</strong> {item.Category}
                                </Card.Text>
                                <audio controls
                                       onError={e => {
                                           e.target.onerror = null;
                                           console.error(`Failed to load audio file. Check that the URL ${item.Audio} is correct and the server is up.`);
                                           e.target.src = ""; // This remove invalid urls
                                       }}
                                >
                                    <source src={`https://arthurfrost.qflo.co.za/${item.Audio}`} type="audio/mpeg"/>
                                    Your browser does not support the audio tag.
                                </audio>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Pagination>
                <Pagination.Prev onClick={() => {
                    if (canPaginatePrev) {
                        setPaginationNumber(paginationNumber - 1)
                    }
                }} disabled={!canPaginatePrev}/>
                {paginationItems}
                <Pagination.Next onClick={() => {
                    if (canPaginateNext) {
                        setPaginationNumber(paginationNumber + 1)
                    }
                }} disabled={!canPaginateNext}/>
            </Pagination>
        </Container>
    );
};

export default MySinglePage;
