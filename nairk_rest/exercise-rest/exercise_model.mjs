import mongoose from 'mongoose';
import 'dotenv/config';
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});
/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});
const Exercise = mongoose.model("Exercise", exerciseSchema);

const isDateValid = async (date) => {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}
const createExercise = async (name, reps, weight, unit, date) => {    
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save();
}
const finding = async () => {
    const d = Exercise.find({})
        return d.exec()
}
const findingID = async (id) => {
    const d = await Exercise.findById({"_id": id})
    if (d === null){
        return null
    } else{
        return d
    }
}

const updation = async (filter, update) => {
    const result = await Exercise.updateOne(filter, update)
    return result.modifiedCount;
}

const deletion = async (id) => {
    const result = await Exercise.deleteOne({"_id": id})
    return result.deletedCount
}



/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
export {createExercise, finding, findingID, updation, deletion, isDateValid}

