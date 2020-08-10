const express = require('express');
const config = require('./config');
const nJwt = require('njwt');

function createRouter(db) {
  const router = express.Router();

  router.post('/createUser', function (req, res, next) {

    db.beginTransaction(function (err) {
      if (err) { throw err; }
      db.query(
        "INSERT INTO rxc353_1.SiteUser(email, accPassword, userType, fullName, telephoneNum) VALUES(?,?, ?, ?,?);",
        [req.body.email, req.body.accPassword, req.body.userType, req.body.fullName, req.body.telephoneNum],
        function (error, results) {
          if (error) {
            db.rollback();
            console.log(error);
            return res.status(500).json({ status: 'error' });
          } else {
            db.query(
              "INSERT INTO rxc353_1.Employee(employeeCategory, isActive, qualifications, email) VALUES(?,?, ?,?);",
              [req.body.employee.category, req.body.employee.isActive, req.body.employee.qualifications, req.body.email],
              (error, results) => {
                if (error) {
                  db.rollback();
                  console.log(error);
                  return res.status(500).json({ status: 'error' });
                } else {
                  db.commit(function (err) {
                    if (err) {
                      return db.rollback(function () {
                        throw err;
                      });
                    }
                  });
                  res.status(200).json(results);
                }
              }
            )



          }
        }
      )
    });


  });

  router.post('/updateUser', function (req, res) {

    if (req.body.newUserInfo.userType == "EMPLOYEE") {
      db.beginTransaction(function (err) {
        if (err) { throw err; } else {
          db.query("UPDATE SiteUser SET email=?, accPassword=?, fullName=?, telephoneNum=? WHERE email=?",
            [req.body.newUserInfo.email, req.body.newUserInfo.accPassword, req.body.newUserInfo.fullName, req.body.newUserInfo.telephoneNum, req.body.oldEmail], function (err, result) {
              if (err) {
                db.rollback();
                console.log(err);
                return res.status(500).json({ status: 'error' });
              } else {
                db.query("UPDATE Employee SET qualifications=? WHERE email=?", [req.body.newUserInfo.employee.category, req.body.newUserInfo.email], function (err, result) {
                  if (err) {
                    db.rollback();
                    console.log(err);
                    return res.status(500).json({ status: 'error' });
                  } else {
                    db.commit(function (err) {
                      if (err) {
                        return db.rollback(function () {
                          throw err;
                        });
                      }
                    });
                    res.status(200).json(result);
                  }
                })
              }
            })
        }
      })
    }


    if (req.body.newUserInfo.userType == "EMPLOYER") {
      db.beginTransaction(function (err) {
        if (err) { throw err; } else {
          db.query("UPDATE SiteUser SET email=?, accPassword=?, fullName=?, telephoneNum=? WHERE email=?",
            [req.body.newUserInfo.email, req.body.newUserInfo.accPassword, req.body.newUserInfo.fullName, req.body.newUserInfo.telephoneNum, req.body.oldEmail], function (err, result) {
              if (err) {
                db.rollback();
                console.log(err);
                return res.status(500).json({ status: 'error' });
              } else {
                db.query("UPDATE Employer SET employerIndustry=? WHERE email=?", [req.body.newUserInfo.employer.industry, req.body.newUserInfo.email], function (err, result) {
                  if (err) {
                    db.rollback();
                    console.log(err);
                    return res.status(500).json({ status: 'error' });
                  } else {
                    db.commit(function (err) {
                      if (err) {
                        return db.rollback(function () {
                          throw err;
                        });
                      }
                    });
                    res.status(200).json(result);
                  }
                })
              }
            })
        }
      })
    }
  })


  router.get('/getJobs', function (req, res, next) {
    db.query("SELECT Jobs.jobID, jobTitle, jobCategory, isActive, salary, postedDate, PostedBy.email, fullName FROM Jobs, PostedBy, SiteUser WHERE (Jobs.jobId = PostedBy.jobID) AND (SiteUser.email = PostedBy.email)", function (err, results) {
      if (err) { throw err; }
      res.status(200).send(results);

    })
  });

  router.get('/getApplications', function (req, res) {
    db.query("SELECT * FROM AppliesTo", function (err, results) {
      if (err) {
        res.status(500).send()
        throw err;
      }
      res.status(200).send(results);

    })
  })

  router.post('/cancelApplication', function (req, res) {
    db.query("DELETE FROM AppliesTo WHERE email=? AND jobID=?", [req.body.email, req.body.jobID], function (err, results) {
      if (err) {
        res.status(500).send()
        throw err;
      }
      res.status(200).send();
    })
  })

  router.post('/sendApplication', function (req, res) {
    db.query("INSERT INTO AppliesTo(email, jobID) VALUES(?,?)", [req.body.email, req.body.jobID], function (err, results) {
      if (err) { throw err; }
      res.status(200).send();
    })
  })

  router.post('/createJob', function (req, res, next) {
    db.query("SELECT employerCategory FROM Employer WHERE email=?", [req.body.email], function (err, results) {
      if (err) { throw err; }


      if (results[0]["employerCategory"] == "PRIME") {
        db.query("SELECT COUNT(jobID) AS count FROM PostedBy WHERE email=?", [req.body.email], function (err, results) {
          if (err) { throw err; }

          if (results[0]["count"] >= 5) {
            return res.status(401).send()
          } else {


            db.beginTransaction(function (err) {
              if (err) { throw err; }
              var insertedJobID;
              db.query("INSERT INTO Jobs(jobTitle, jobCategory, salary) VALUES(?,?, ?)", [req.body.jobTitle, req.body.jobCategory, req.body.salary], function (err, result) {
                insertedJobID = result.insertId;
                if (err) {
                  db.rollback();
                  console.log(err);
                  return res.status(500).json({ status: 'error' });
                } else {
                  db.query("INSERT INTO PostedBy(email, jobID) VALUES(?,?)", [req.body.email, insertedJobID], function (err, result) {
                    if (err) {
                      db.rollback();
                      console.log(err);
                      return res.status(500).json({ status: 'error' });
                    }

                    db.commit(function (err) {
                      if (err) {
                        return db.rollback(function () {
                          throw err;
                        });
                      } else {
                        res.status(200).send()
                      }
                    });



                  })
                }
              })

            })

          }


        })
      }

    })


  });


  router.post('/deleteJob', function (req, res) {
    db.beginTransaction(function (err) {
      if (err) { throw err; }

      db.query("DELETE FROM PostedBy WHERE jobID=?", [req.body.id], function (err, result) {
        if (err) {

          db.rollback();
          console.log(err);
          return res.status(500).json({ status: 'error' });
        } else {
          db.query("DELETE FROM AppliesTo WHERE jobID=?", [req.body.id], function (err, result) {
            if (err) {

              db.rollback();
              console.log(err);
              return res.status(500).json({ status: 'error' });
            } else {
              db.query("DELETE FROM Jobs WHERE jobID=?", [req.body.id], function (err, result) {
                if (err) {
                  db.rollback();
                  console.log(err);
                  return res.status(500).json({ status: 'error' });
                } else {
                  db.commit(function (err) {
                    if (err) {
                      return db.rollback(function () {
                        throw err;
                      });
                    } else {
                      res.status(200).send()
                    }
                  });
                }

              })
            }
          })
        }
      })
    })
  })

  router.post('/login', function (req, res) {
    if (req.body.type == "employee") {
      db.query("SELECT S.email, accPassword AS password, fullName, telephoneNum, userType, accountBalance, employeeCategory, isActive, qualifications FROM SiteUser S INNER JOIN Employee E ON (S.email = E.email) WHERE S.email=?", req.body.email, function (err, user) {
        if (err) return res.status(500).send({ status: 'Server error', err: err });
        if (!user[0]) return res.status(404).send('User not found');


        if (req.body.password != user[0].password) {
          return res.status(401).send({ auth: false, token: null });
        }

        var jwt = nJwt.create({ id: user.email }, config.secret);
        jwt.setExpiration(new Date().getTime() + (24 * 60 * 60 * 1000)); //auth token valid for 24 hours

        res.status(200).send({ auth: true, token: jwt.compact(), u: user[0] });
      });
    }

    if (req.body.type == "employer") {
      db.query("SELECT S.email, accPassword AS password, fullName, userType, telephoneNum, accountBalance, employerCategory, employerIndustry FROM SiteUser S INNER JOIN Employer E ON (S.email = E.email) WHERE S.email=?", req.body.email, function (err, user) {
        if (err) return res.status(500).send({ status: 'Server error', err: err });
        if (!user[0]) return res.status(404).send('User not found');


        if (req.body.password != user[0].password) {
          return res.status(401).send({ auth: false, token: null });
        }

        var jwt = nJwt.create({ id: user.email }, config.secret);
        jwt.setExpiration(new Date().getTime() + (24 * 60 * 60 * 1000)); //auth token valid for 24 hours

        res.status(200).send({ auth: true, token: jwt.compact(), u: user[0] });
      });

    }

  });

  return router;
}

module.exports = createRouter;