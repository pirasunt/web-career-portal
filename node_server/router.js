const express = require('express');
const config = require('./config');
const nJwt = require('njwt');

function createRouter(db) {
  const router = express.Router();

  router.post('/createEmployee', function (req, res, next) {
    console.log("Create User route activated")
    db.beginTransaction(function (err) {
      if (err) { throw err; }
    db.query(
      "INSERT INTO rxc353_1.SiteUser(email, accPassword, userType, fullName, telephoneNum) VALUES(?,?, ?, ?,?);",
      [req.body.email, req.body.accPassword, req.body.userType, req.body.fullName, req.body.telephoneNum],
      (error, results) => {
        if (error) {
          db.rollback();
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          db.query(
            "INSERT INTO rxc353_1.Employee(employeeCategory, isActive, qualifications, email) VALUES(?,?, ?,?);",
            [req.body.employee.category, req.body.employee.isActive, req.body.employee.qualifications, req.body.employee.siteUser.email],
            (error, results) => {
              if (error) {
                db.rollback();
                console.log(error);
                res.status(500).json({ status: 'error' });
              } else {
                db.commit(function(err) {
                  if (err) {
                    return db.rollback(function() {
                      throw err;
                    });
                  }
                });
                res.status(200).json(results);
                console.log(results)
              }
            }
          )
          


        }
      }
    )});


  });


  router.post('/login', function (req, res) {
    if(req.body.type == "employee") {
    db.query("SELECT S.email, accPassword AS password, fullName, telephoneNum, accountBalance, employeeCategory, isActive, qualifications FROM SiteUser S INNER JOIN Employee E ON (S.email = E.email) WHERE S.email=?", req.body.email, function (err, user) {
      if (err) return res.status(500).send({ status: 'Server error', err: err });
      if (!user[0]) return res.status(404).send('User not found');


      if (req.body.password != user[0].password) {
        return res.status(401).send({ auth: false, token: null });
      }

      var jwt = nJwt.create({ id: user.email }, config.secret);
      jwt.setExpiration(new Date().getTime() + (24 * 60 * 60 * 1000)); //auth token valid for 24 hours

      console.log(user)
      res.status(200).send({ auth: true, token: jwt.compact(), u:user[0]});
    });
  }

  });

  return router;
}

module.exports = createRouter;