// In src/services/workoutServices.js
const { v4: uuid } = require('uuid');
const Workout = require('../database/workOut');

const getAllWorkouts = (search,result) => {
    try {
        const allWorkouts = Workout.getAllWorkouts(search,result);
    } catch (error) {
        throw error;
    }
};

const getOneWorkout = (workoutId,result) => {
    const workout = Workout.getOneWorkout(workoutId,result);

};

const createNewWorkout = (newWorkout,result) => {
    const workoutToInsert = {
        ...newWorkout,
    };
    const createdWorkout = Workout.createNewWorkout(
        workoutToInsert,result
    );

};

const updateOneWorkout = (workoutId, changes,result) => {
    const updatedWorkout = Workout.updateOneWorkout(
        workoutId,
        changes,
        result
    );

};

const deleteOneWorkout = (workoutId) => {
    Workout.deleteOneWorkout(workoutId);
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};