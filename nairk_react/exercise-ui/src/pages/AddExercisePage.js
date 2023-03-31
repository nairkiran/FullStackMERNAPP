// import { application, response } from 'express';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('kgs');
    const [date, setDate] = useState('');

    const navigate = useNavigate()

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201){
            alert("Successfully added the exercise!");
        } else{
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select
                onChange={e => setUnit(e.target.value)} value={unit}>
                <option>kgs</option>
                <option>lbs</option>
            </select>
            <input
                type="text"
                placeholder="Date (MO-DY-YR)"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button id="AddButton"
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;