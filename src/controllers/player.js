const passport = require('passport');
const { User, Player } = require('../models');

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
exports.create = (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (!user) {
      return res.status(403).json({ 'message': info });
    }

    let first_name = req.body.first_name,
        last_name  = req.body.last_name,
        handedness = req.body.handedness;


    const player = new Player({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      handedness: req.body.handedness,
      rating: req.body.rating
    });

    player.save((err) => {
      if (err) {
        let errors = [];
        _.each(err.errors, (err) => {
          errors.push(err.message);
        });
        return res.status(409).json({'message': errors.join('; ')})
      } else { 
        user.players.push(player._id);
        user.save();
        return res.status(200).json({ 
          'success': true,
          'player': {
            'id': player._id,
            'first_name': player.first_name,
            'last_name': player.last_name,
            'rating': player.rating,
            'handedness': player.handedness  
          }
        });
      }
    })
  })(req, res, next);
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
