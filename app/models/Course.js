var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CourseSchema   = new Schema({
	id: Number,
	courseId: String,
	courseName: String,
	coursePeriod :Number
});

module.exports = mongoose.model('Course', CourseSchema);