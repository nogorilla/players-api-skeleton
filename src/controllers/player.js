
/**
 * List all current players in the system. Players are scoped to the current user.
 * GET /api/players
 * 
 * HEADERS
 * Authorization - JWT passed in bearer format
 * 
 * @return 
 *   success - [boolean] Success indicator
 *   players - [array] List of players
 */
exports.get = (req, res) => {
  res.json({
    'controller': 'Player',
    'method': 'get'
  });
};

/**
 * used to create a player
 * POST /api/players
 * @param first_name - [string] Player first name
 * @param last_name  - [string] Player last name
 * @param rating     - [string] Player rating
 * @param handedness - [enum] Player handedness (left or right)
 * 
 * @return
 *   success - [boolean] Success indicator
 *   player  - [object] Player details
 *  
 */
exports.create = (req, res) => {
  res.json({
    'controller': 'Player',
    'method': 'create'
  });
};

/**
 * used to create a player
 * POST /api/users
 * @param id - Player ID
 *  
 * @return
 *   success - [boolean] Success indicator
 */
exports.delete = (req, res) => {
  res.json({
    'controller': 'Player',
    'method': 'delete'
  });
};
