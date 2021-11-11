const express = require('express');
// const authRequired = require('../middleware/authRequired');
const Admins = require('./adminModel');
const router = express.Router();

router.get('/', function (req, res) {
  Admins.getAdmins()
    .then((adminList) => {
      res.status(200).json(adminList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get('/:id', function (req, res) {
  const id = String(req.params.id);
  Admins.findByAdminId(id)
    .then((admin) => {
      if (admin) {
        res.status(200).json(admin);
      } else {
        res.status(404).json({ error: 'AdminNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', async (req, res) => {
  const admin = req.body;
  if (admin) {
    const { user_id } = admin;
    try {
      await Admins.findByUserId(user_id).then(async (user) => {
        if (user.length === 0) {
          await Admins.addAdmin(admin).then((inserted) =>
            res
              .status(200)
              .json({ message: 'Admin added.', admin: inserted[0] })
          );
        } else {
          res.status(400).json({ message: 'Admin already exists.' });
        }
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(404).json({ message: 'Admin details missing.' });
  }
});

router.put('/', (req, res) => {
  const admin = req.body;
  if (admin) {
    const { id } = admin;
    Admins.findByAdminId(id)
      .then(
        Admins.updateAdmin(id, admin)
          .then((updated) => {
            res.status(200).json({
              message: `Admin with id: ${id} updated`,
              admin: updated[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: `Could not update admin '${id}'`,
              error: err.message,
            });
          })
      )
      .catch((err) => {
        res.status(404).json({
          message: `Could not find admin '${id}'`,
          error: err.message,
        });
      });
  }
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  try {
    Admins.findByAdminId(id).then((admin) => {
      Admins.removeAdmin(admin[0].id).then(() => {
        res.status(200).json({
          message: `Admin with id:'${id}' was deleted.`,
          admin: admin[0],
        });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete admin with ID: ${id}`,
      error: err.message,
    });
  }
});

module.exports = router;
