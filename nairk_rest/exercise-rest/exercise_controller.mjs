import 'dotenv/config';
import * as exercise from './exercise_model.mjs';
import express from 'express';
import e from 'express';
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.post('/exercises', async (req, res) => {
    if ((req.body.weight <= 0) || (isNaN(req.body.weight))){
        res.status(400).json({ Error: "Invalid request"});
    } else if ((req.body.name.length <= 0)) {
        res.status(400).json({ Error: "Invalid request"});
    } else if ((req.body.reps <= 0) || (isNaN(req.body.reps))) {
        res.status(400).json({ Error: "Invalid request"});
    } else if ((req.body.unit !== "kgs") && (req.body.unit !== "lbs")) {
        res.status(400).json({ Error: "Invalid request"});
    } else if (await exercise.isDateValid(req.body.date) === false) {
        res.status(400).json({ Error: "Invalid request"});
    } else if (req.body.name === undefined || req.body.weight === undefined || req.body.reps === undefined || req.body.unit === undefined || req.body.date === undefined) {
        res.status(400).json({ Error: "Invalid request"});
    } else {
        const k = await exercise.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        res.status(201).json(k)
    }
});

app.get('/exercises', (req, res) => {
    exercise.finding()
        .then(exercise => {
            res.status(200).json(exercise)
        })
        .catch(error => {
            res.send({ Error: 'Invalid Request' });
        });
});

app.get('/exercises/:id', (req, res) => {
    exercise.findingID(req.params.id)
    .then(exercise => {
        if (exercise === null){
            throw error
        }
        res.status(200).json(exercise)
    })
    .catch(error => {
        res.status(404).json({ Error: "Not found"});
    })
});

app.put('/exercises/:id', async (req, res) => {
    if (await exercise.findingID(req.params.id) === null) {
        res.status(404).json({ Error: "Not found"});
    } else if ((req.body.weight <= 0) || (isNaN(req.body.weight))){
        res.status(400).json({ Error: "Invalid request"});
    } else if ((req.body.name.length <= 0)) {
        res.status(400).json({ Error: "Invalid request"});
    } else if ((req.body.reps <= 0) || (isNaN(req.body.reps))) {
        res.status(400).json({ Error: "Invalid request"});
    } else if ((req.body.unit !== "kgs") && (req.body.unit !== "lbs")) {
        res.status(400).json({ Error: "Invalid request"});
    } else if (await exercise.isDateValid(req.body.date) === false) {
        res.status(400).json({ Error: "Invalid request"});
    } else if (req.body.name === undefined || req.body.weight === undefined || req.body.reps === undefined || req.body.unit === undefined || req.body.date === undefined) {
        res.status(400).json({ Error: "Invalid request"});
    } else {
        const k = await exercise.updation({"_id": req.params.id}, {"name" :req.body.name, "reps": req.body.reps, "weight": req.body.weight, "unit": req.body.unit, "date": req.body.date})
        res.status(200).json({"_id": req.params.id, "name" :req.body.name, "reps": req.body.reps, "weight": req.body.weight, "unit": req.body.unit, "date": req.body.date})
    }
});

app.delete('/exercises/:id', async (req, res) => {
    const l = await exercise.findingID(req.params.id)
    if (l === null){
        res.status(404).json({ Error: "Not found"});
    } else{
        const k = await exercise.deletion(req.params.id)
        res.status(204)
        res.send(l)
    }
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});