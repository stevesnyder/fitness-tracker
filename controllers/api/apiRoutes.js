const router = require('express').Router();
const Workout = require('../../models/Workout');

router.post('/workouts', (req, res) => {
  Workout.create({})
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.put('/workouts/:id', (req , res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true }
  ).then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
    

router.get('/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});
  

router.get('/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ]).sort({ _id: -1 }).limit(7)
    .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
});
    

router.delete('/workouts', (req, res) => {
  Workout.findByIdAndDelete(req.body.id)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;