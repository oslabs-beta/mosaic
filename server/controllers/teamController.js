import Team from '../models/TeamModel';
const teamController = {};

teamController.fetchTeams = async (req, res, next) => {
  Team.find({})
    .then((data) =>{
      res.locals.response = data;
      next();
    })
    .catch((err) => {
      next({
        log: `Fetch teams - ERROR: ${err}`,
        message: {
          err: 'Error occured in teamController.fetchTeams',
          message: err,
        },
      });
    })
};


export default teamController;