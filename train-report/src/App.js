import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import TrainListPage from './TrainList';
import TrainDetailsPage from './TrainDetails';

function App() {
return (
    <Routes>
        <Route  path="/" element={<TrainListPage/>} />
        <Route  path="/train/:trainId" element={<TrainDetailsPage/>} />
    </Routes>
);
}

export default App;