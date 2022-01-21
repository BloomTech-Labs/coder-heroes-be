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
  if (!role) next({ status: 400, message: 'role is required' });
  if (!email) next({ status: 400, message: 'email is required' });
  if (!name) next({ status: 400, message: 'name is required' });
  if (!okta_id) next({ status: 400, message: 'okta_id is required' });
  if (
    typeof role !== 'string' ||
    typeof email !== 'string' ||
    typeof name !== 'string' ||
    typeof okta_id !== 'string'
  )
    next({
      status: 400,
      message: 'variables in the request body must all be of type string',
    });
  if (
    role.length > 255 ||
    email.length > 255 ||
    name.length > 255 ||
    okta_id.length > 255
  )
    next({
      status: 400,
      message:
        'strings sent in the request body must not exceed a length of 255 characters',
    });

  next();
};

module.exports = {
  checkAdminExist,
  checkPayload,
};
