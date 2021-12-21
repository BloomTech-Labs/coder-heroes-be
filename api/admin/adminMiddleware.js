const Admins = require('./adminModel');

const checkAdminExist = async (req, res, next) => {
  const id = req.params.id;
  const foundAdmin = await Admins.findByAdminId(id);
  if (!foundAdmin) {
    next({ status: 404, message: `admin with id ${id} is not found ` });
  } else {
    req.admin = foundAdmin;
    next();
  }
};

const checkPayload = (req, res, next) => {
  const { email, name, okta_id, role } = req.body;
  if (role === '' || role === undefined) {
    next({ status: 404, message: 'role is required' });
  }
  if (email === '' || email === undefined) {
    next({ status: 404, message: 'email is required' });
  }
  if (name === '' || name === undefined) {
    next({ status: 404, message: 'name is required' });
  }

  if (okta_id === '' || okta_id === undefined) {
    next({ status: 404, message: 'okta_id is required' });
  } else {
    next();
  }
};

module.exports = {
  checkAdminExist,
  checkPayload,
};
