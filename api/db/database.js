const mongoose = require('mongoose');

let instance = null;

class Database {
    constructor() {
        if (!instance) {
            this.mongooseConnection = null;
            console.log('Database class created');
            instance = this;
        }
        return instance;
    }

    async connect(options) {
        try {
            let db = await mongoose.connect(options.MONGODB_URI);
            this.mongooseConnection = db;
            console.log('Database connection successful');
        } catch (err) {
            console.log('Database connection failed');
            console.log(err);
            process.exit(1);
        }    
    }
}

mongoose.connection.once('open', () => {
    console.log('Database connection established');
}
);



module.exports = Database;