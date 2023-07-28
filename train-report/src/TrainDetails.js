import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const TrainDetailsPage = () => {
const { trainId } = useParams(); 
const [trainDetails, setTrainDetails] = useState(null);

useEffect(() => {
    axios.get(`https://api.example.com/train/${trainId}`)
    .then(response => setTrainDetails(response.data))
    .catch(error => console.error('Error fetching data:', error));
}, [trainId]);



return (
    <div>
    {trainDetails ? (
        <div>
        <h2>{trainDetails.trainName}</h2>
        </div>
    ) : (
        <p>Loading...</p>
    )}
    </div>
);
};

export default TrainDetailsPage;