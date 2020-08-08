const express = require('express');

function createRouter(db) {
  const router = express.Router();

  router.post('/createUser', function (req, res, next) {
    console.log("inside createuser")
    db.query(
      'INSERT INTO SiteUser(email, accPassword, userType, fullName, telephoneNum) VALUES (?,?, ?, ?,?)',
      [req.body.email, req.body.accPassword, req.body.userType, req.body.fullName, req.body.telephoneNum],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  return router;
}

module.exports = createRouter;