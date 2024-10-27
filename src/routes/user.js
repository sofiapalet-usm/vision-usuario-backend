const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');
const activitySchema = require('../models/activity');

/* Create user */
router.post('/users', async (req, res) => {
  const body = userSchema(req.body);

  const user = new userSchema({
    name: body.email.split('@')[0],
    email: body.email,
    level: 1,
    experience: 0,
    coins: 0
  });
  const savedUser = await user.save();

  const activity1 = new activitySchema({
    name: 'Gestión en la farmacia',
    technique: 'Mapa de Empatía',
    userId: user._id,
    scores: [0,0,0],
    interviewQuestions: [false, false, false, false, false],
    activityDone: [false, false, false, false]
  });
  const activity2 = new activitySchema({
    name: 'Compras escolares',
    technique: 'Método Persona',
    userId: user._id,
    scores: [0,0,0],
    activityDone: [false, false, false, ]
  });

  const savedActivity1 = await activity1.save();
  const savedActivity2 = await activity2.save();

  res.json({user: savedUser, activity1: savedActivity1, activity2: savedActivity2});
});

/* Get all users */
router.get('/users', (req, res) => {
  userSchema
    .find()
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Get user by email */
router.get('/users/email', (req, res) => {
  const email = req.query.email;
  userSchema
    .find({ email: email })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Get user */
router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Update user */
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, level, experience, coins, items, outfit } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: {name, email, level, experience, coins, items, outfit} })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Delete user */
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  /* Delete all user activities */
  await activitySchema.deleteMany({ userId: id })

  await userSchema
    .deleteOne({ _id: id })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

module.exports = router;