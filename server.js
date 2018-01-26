// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var jf = require('jsonfile');
var MongoClient = require('mongodb').MongoClient;

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3000; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Testdb'); // connect to our database
var Course     = require('./app/models/Course');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.get('/', function(req, res) {
	res.sendfile('Index.html');	
});

// on routes that end in /courses
// ----------------------------------------------------
router.route('/courses')

	// create a course (accessed at POST http://localhost:8080/courses)
	.post(function(req, res) {
		console.log(req.body);
		var course = new Course();		// create a new instance of the Course model  // set the courses name (comes from the request)
		course.courseId = req.body.courseId;
		course.id = req.body.id;
		course.courseName = req.body.courseName;
		course.coursePeriod =req.body.coursePeriod;
		course.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'course created!' });
		});

		
	})

	// get all the courses (accessed at GET http://localhost:8080/api/courses)
	.get(function(req, res) {
		Course.find(function(err, courses) {
			if (err)
				res.send(err);

			res.json(courses);
		});
	});

// on routes that end in /courses/:Course_id
// ----------------------------------------------------
router.route('/courses/:course_id')

	// get the course with that id
	.get(function(req, res) {
		Course.findById(req.params.course_id, function(err, course) {
			if (err)
				res.send(err);
			res.json(course);
		});
	})

	// update the course with this id
	.put(function(req, res) {
		Course.findById(req.params.course_id, function(err, course) {

			if (err)
				res.send(err);

			course.name = req.body.name;
			course.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'course updated!' });
			});

		});
	})

	// delete the course with this id
	.delete(function(req, res) {
		Course.remove({
			_id: req.params.course_id
		}, function(err, course) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port:  ' + port);
