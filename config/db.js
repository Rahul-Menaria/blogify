const mongoose = require('mongoose');
require('dotenv').config();
module.exports = connect = async () => {
	try {
		const response = await mongoose.connect("mongodb+srv://<username:password>@cluster0.31dn9.mongodb.net/blogify?retryWrites=true&w=majority", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		});
		console.log('connection created');
	} catch (error) {
		console.log(error);
	}
};
// process.env.URL
