// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//this is the work i had started with. I didn't finish it because I didn't fully understand how the Date() object and it's methods worked, and after hours of researching i still wasn't getting any closer, so i finally looked at the hints and provided solution, and at that point understood what needed to be done and how to do it. and from there there's no reason not to just use the provided solution. 

// const dateMiddleware = (req, res, next) => {
//   //store recieved data
//   const { reqData } = req.params;

//   let isValidDate = 

//   if () {
//     req.unix = Date.toUTCString(reqData);
//     req.utc = Date.valueOf(reqData);
//     next();
//   } else {
//     req.error = "Invalid Date";
//     next();
//   }
//   date = new Date().toString();

// };

// app.get('/api/timestamp/:date', dateMiddleware, (req, res) => {
//   if (req.error) {
//     res.send({error: req.error})
//   } else {
//     res.send({
//       unix: req.unix,
//       utc: req.utc
//     });
//   }
// })

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  //A 4 digit number is a valid ISO-8601 for the beginning of that year
  //5 digits or more must be a unix time, until we reach a year 10,000 problem
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    //Date regards numbers as unix timestamps, strings are processed differently
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
