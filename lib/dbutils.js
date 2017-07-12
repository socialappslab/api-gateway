var mongo = require('mongodb').MongoClient;
var mongoUri = process.env.USNB_MONGO_URI_ENTITY_MANAGER;

exports.mongoUri = mongoUri;
exports.BSON = mongo.BSONPure;

exports.cleardb = (doneit) => {

    console.log('Clearing Database: ' + mongoUri);

    mongo.connect(mongoUri, (err, db) => {
        if (err)
            return console.dir(err);

        db.collection('messages', (err, collection) => {
            if (err)
                return console.dir(err);
            collection.remove({}, {
                w: 1
            }, (err, result) => {
                if (err)
                    return console.dir(err);
                db.collection('users', (err, collection) => {
                    if (err)
                        return console.dir(err);
                    collection.remove({}, {
                        w: 1
                    }, (err, result) => {
                        if (err)
                            return console.dir(err);
                        db.collection('services', (er, collection) => {
                            if (err)
                                return console.dir(err);
                            collection.remove({}, {
                                w: 1
                            }, (err, result) => {
                                if (err)
                                    return console.dir(err);
                                db.collection('identities', (er, collection) => {
                                    if (err)
                                        return console.dir(err);
                                    collection.remove({}, {
                                        w: 1
                                    }, (err, result) => {
                                        if (err)
                                            return console.dir(err);
                                        db.collection('preferences', (er, collection) => {
                                            if (err)
                                                return console.dir(err);
                                            collection.remove({}, {
                                                w: 1
                                            }, (err, result) => {
                                                if (err)
                                                    return console.dir(err);
                                                db.close();
                                                console.log('Database cleared');
                                                doneit();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
