const express = require('express');
const router = express.Router();
const activitySchema = require('../models/activity');

/* Create activity */
router.post('/activities', (req, res) => {
  const activity = activitySchema(req.body);
  activity
    .save()
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Get all activities */
router.get('/activities', (req, res) => {
  activitySchema
    .find()
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Get activity by userId */
router.get('/activities/user/:userId', (req, res) => {
  const userId = req.params.userId;
  activitySchema
    .find({ userId: userId })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Get activity by Technique */
router.get('/activities/technique', (req, res) => {
  const technique = req.body.technique;
  activitySchema
    .find({ technique: technique })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});


/* Find one activity */
router.get('/activities/findone', (req, res) => {
  const name = req.query.name;
  const technique = req.query.technique;
  const userId = req.query.userId;
  activitySchema
    .find({ userId, name, technique })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Get activity by Id */
router.get('/activities/:id', (req, res) => {
  const { id } = req.params;
  activitySchema
    .findById(id)
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Update activity */
router.put('/activities/:id', (req, res) => {
  const { id } = req.params;
  const { name, technique, userId, scores, interviewQuestions, activityDone } = req.body;
  activitySchema
    .updateOne({ _id: id }, { $set: {name, technique, userId, scores, interviewQuestions, activityDone} })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Delete activity by user */
router.delete('/activities/user/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  activitySchema
    .deleteMany({ userId: userId })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Delete activity */
router.delete('/activities/:id', (req, res) => {
  const { id } = req.params;
  activitySchema
    .deleteOne({ _id: id })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

module.exports = router;