const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');

/* Create user */
router.post('/users', (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
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
  const { name, email, level, experience, coins } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: {name, email, level, experience, coins} })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

/* Delete user */
router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => {res.json(data)})
    .catch((error) => {res.json({message: error})});
});

module.exports = router;