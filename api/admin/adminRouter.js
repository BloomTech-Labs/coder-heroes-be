const express = require('express');
const authRequired = require('../middleware/authRequired');
const {
  roleAuthentication,
  roles,
} = require('../middleware/roleAuthentication');
const Admins = require('./adminModel');
const router = express.Router();
const { checkAdminExist, checkPayload } = require('./adminMiddleware');

router.get('/', authRequired, roleAuthentication(...roles.slice(3)), function (
  req,
  res
) {
  Admins.getAdmins()
    .then((adminList) => {
      res.status(200).json(adminList);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get(
  '/:id',
  checkAdminExist,
  authRequired,
  roleAuthentication(...roles.slice(3)),
  function (req, res, next) {
    try {
      res.status(200).json(req.admin);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  checkPayload,
  authRequired,
  roleAuthentication(...roles.slice(3)),
  async (req, res, next) => {
    try {
      const newadmin = await Admins.addAdmin(req.body);
      res.status(201).json(newadmin);
    } catch (error) {
      next({ status: 400, message: 'could not create new admin profile' });
    }
  }
);

router.put('/:id', authRequired, checkAdminExist, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { profile_id } = req.admin;
    const updatedAdmin = await Admins.updateAdmin(profile_id, req.body, id);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    next({
      status: 500,
      message: 'soemthing went wrong while updating admin profile',
    });
  }
});

router.delete('/:id', authRequired, checkAdminExist, async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedAdmin = await Admins.removeAdmin(id);
    res.status(200).json(deletedAdmin);
  } catch (error) {
    next(error);
  }
});

router.use('*', errorhandler);
//eslint-disable-next-line
function errorhandler(err, req, res, next) {
  res.status(err.status || 500).json(err.message);
}

module.exports = router;
