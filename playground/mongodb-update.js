const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        console.log('Error connecting to database');
    }
    console.log('Connected to database');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('58cf68d15c4e0e68c9288b79')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }, function (err, data) {
    //     console.log(data);
    // });


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('58cd7335c613212bd5fc5f1f')
    }, {
        $set: {
            name: 'Vishak'
        },
        $inc: {
            age: 1
        }

    }, {
        returnOriginal: false
    }, function (err, data) {
        console.log(data);
    });

    db.close();
});