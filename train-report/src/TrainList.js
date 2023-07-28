import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const TrainListPage = () => {


const trainarray = [
    {
        iud : '1',
        name:'shatabdi express',
       type:'sleeper class'
    },
    {
        iud : '2',
        name:'Garibrath express',
       type:'sleeper class'
    },
    {
        iud : '3',
        name:'Kalkaji Express',
       type:'AC First'
    },
    {
        iud : '4',
        name:'Vande Bharat Express',
       type:'AC Two tier'
    },
    {
        iud : '5',
        name:'Chetak Express',
       type:'AC First'
    },
]



return (
    <div>
<h2>All Trains Schedule</h2>

  {trainarray.map((item)=>(
    <ul>
        <li >{item.name}</li>
    </ul>
  ))}


    </div>
);
};

export default TrainListPage;