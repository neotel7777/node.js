// In src/controllers/workoutController.js
const workoutService = require('../services/workoutServices');
const getAllWorkouts = (req, res) => {

    // *** ADD ***
    const mode = req.query;

    try {
        // *** ADD ***
        const allWorkouts = workoutService.getAllWorkouts(mode,res);

    } catch (error) {
        res.status(error?.status || 500).send({
            status: 'FAILED',
            data: { error: error?.message || error },
        });
    }
};

const getOneWorkout = (req, res) => {
    const {
        params: { faqId },
    } = req;
    if (!faqId) {
        return;
    }
    const workout = workoutService.getOneWorkout(faqId,res);
};

const createNewWorkout = (req, res) => {
    const { body } = req;

    if(body.id){
        delete(body.id);
    }
    // *** ADD ***
    if (
        !body.titleRO ||
        !body.titleRU ||
        !body.titleEN ||
        !body.textRO ||
        !body.textRU ||
        !body.textEN
    ) {
        return;
    }
    // *** ADD ***
    const newWorkout = {
        body
    };
    // *** ADD ***
    const createdWorkout = workoutService.createNewWorkout(
        newWorkout,res
    );

};

const updateOneWorkout = (req, res) => {
    const {
        body,
        params: { faqId },
    } = req;
    if (!faqId) {
        return;
    }

    const updatedWorkout = workoutService.updateOneWorkout(
        faqId,
        body,
        res
    );

};

const deleteOneWorkout = (req, res) => {
    const {
        params: { faqId },
    } = req;
    if (!workoutId) {
        return;
    }
    workoutService.deleteOneWorkout(faqId);
    res.status(204).send({ status: 'OK' });
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};