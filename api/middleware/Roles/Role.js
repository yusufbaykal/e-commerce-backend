const { roles } = require('../../config/Role/rolePermissions');

function PermissionAuthorize(permissionKey) {
  return (req, res, next) => {
    try {
      const userRole = req.user.roles;
      const role = roles.find((role) => role.id === userRole);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      if (role.role_permissions === 'ALL') {
        return next();
      }

      if (role.role_permissions.includes(permissionKey)) {
        return next();
      } else {
        return res.status(403).json({ message: 'Access Denied: You do not have permission' });
      }
    } catch (error) {
      console.error('Error in PermissionAuthorize middleware:', error);
      return res.status(500).json({ message: 'Error checking permissions', error: error.message });
    }
  };
}

module.exports = PermissionAuthorize;
