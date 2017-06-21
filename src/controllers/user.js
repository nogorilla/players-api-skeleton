
/**
 * used to create a user
 * POST /api/users
 * @param first_name       - [string] User first name
 * @param last_name        - [string] User last name
 * @param email            - [string] User email
 * @param password         - [string] User password
 * @param confirm_password - [string] User password confirmation
 * 
 * @return
 *   success - [boolean] Success indicator
 *   user    - [object] User details
 *   token   - [string] JWT token
 *  
 */
exports.create = (req, res) => {
  res.json({
    'controller': 'User',
    'method': 'create'
  });
};

/**
 * used to create a player
 * POST /api/users
 * @param email    - [string] User email
 * @param password - [string] User password
 *  
 * @return
 *   success - [boolean] Success indicator
 *   user    - [object] User details
 *   token   - [string] JWT token
 */
exports.login = (req, res) => {
  res.json({
    'controller': 'User',
    'method': 'login'
  });
};
