const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log('Error connecting to database');
    }
    console.log('Successfully connected to the database');

    // db.collection('Todos').deleteMany({text: "eat lunch"}, function (err, data) {
    //     if(err) {
    //         return console.log('unable to delete data');
    //     }
    //     console.log('deleted all data');
    //     console.log(data);
    // });

    // db.collection('Todos').deleteOne({text: 'eat lunch'}, function(err, data) {
    //     if(err) {
    //         return console.log('unable to delete data');
    //     }
    //     console.log(data);
    // });

    // db.collection('Todos').findOneAndDelete({completed: false}, function(err, data) {
    //     if (err) {
    //         return console.log('Unable to delete');
    //     }
    //
    //     console.log(data);
    // });


    // db.collection('Users').deleteMany({name: 'Vivek'}, function(err, data) {
    //     console.log(data);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('58cd74ceddc7912d95463ba0')}, function(err, data) {
        console.log(data);
    });

    db.close();
})