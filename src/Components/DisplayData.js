import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

const JsonDisplayPage = () => {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php')
            .then(response => {
                setJsonData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Container>
            <h1 className="mt-3 mb-4">JSON Data Display</h1>
            <div className="card-container">
                {Array.isArray(jsonData) && jsonData.map((item, index) => (
                    <Card key={item.Id} className="mb-3">
                        <Card.Header>{item.Title}</Card.Header>
                        <Card.Body>
                            <Card.Text>Episode: {item.Episode}</Card.Text>
                            <Card.Text>Media: {item.Media}</Card.Text>
                            <Card.Text>Description: {item.Description}</Card.Text>
                            <Card.Text><img src={item.Image} alt="Media image" /></Card.Text>
                            <Card.Text><img src={item.Icon} alt="Icon" /></Card.Text>
                            <Card.Text>Audio: {item.Audio}</Card.Text>
                            <Card.Text>RemoteId: {item.RemoteId}</Card.Text>
                            <Card.Text>Status: {item.Status}</Card.Text>
                            <Card.Text>isActive: {item.isActive}</Card.Text>
                            <Card.Text>inId: {item.inId}</Card.Text>
                            <Card.Text>CreateDate: {item.CreateDate}</Card.Text>
                            <Card.Text>MediaName: {item.MediaName}</Card.Text>
                            <Card.Text>Category: {item.Category}</Card.Text>
                            <Card.Text>Epoch: {item.Epoch}</Card.Text>
                            <Card.Text>AudioSize: {item.AudioSize}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default JsonDisplayPage;
