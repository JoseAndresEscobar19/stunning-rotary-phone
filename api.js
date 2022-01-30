var router = require("express").Router();
var request = require("request");
const data = require("./data");

router.get("/profile", (req, res) => {
  var qname = req.query.name;
  if (qname) {
    var options = {
      method: "GET",
      url: `https://torre.bio/api/bios/${qname}`,
      headers: {},
    };
    request(options, function (error, response) {
      if (error) res.json({});
      res.json(JSON.parse(response.body));
    });
  } else {
    res.json({});
  }
});

router.get("/people", (req, res) => {
  var qskill = req.query.skill;
  var qproficiency = req.query.proficiency;
  var qlimit = req.query.limit || 2;
  if (qskill && qproficiency) {
    var options = {
      method: "POST",
      url: `https://search.torre.co/people/_search/?size=${qlimit}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "skill/role": {
          "text": qskill,
          "proficiency": qproficiency,
        },
      }),
    };
    request(options, function (error, response) {
      if (error) res.json({});
      res.json(JSON.parse(response.body));
    });
  } else {
    res.json({});
  }
});

router.get("/jobs", (req, res) => {
  var qskill = req.query.skill;
  var qproficiency = req.query.proficiency;
  var qlimit = req.query.limit || 2;
  if (qskill && qproficiency) {
    var options = {
      method: "POST",
      url: `https://search.torre.co/opportunities/_search/?size=${qlimit}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "skill/role": {
          "text": qskill,
          "proficiency": qproficiency,
        },
      }),
    };
    request(options, function (error, response) {
      if (error) res.json({});
      res.json(JSON.parse(response.body));
    });
  } else {
    res.json({});
  }
});

module.exports = router;
