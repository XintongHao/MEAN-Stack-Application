const mongoClient = require('mongodb').MongoClient;

const mongoURL = 'mongodb://localhost:27017';
let _db;
module.exports = {
    connect: function( callback ) {
        mongoClient.connect( mongoURL,
            { useNewUrlParser: true }, function( err, client) {
                _db = client.db('passport');
                console.log("Database created!");
                _db.createCollection("users", function(err, res) {
                    if(err) throw err;
                    console.log("Collection created!");
                });
                return callback( err );
            } );
    },
    getDB: () => { return _db; }
};
