const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
   if (err) {
       return console.log('Error connecting to the DB', err);
   }

   console.log('Connected to the database');

    // db.collection('Todos').find({
    //     _id: new ObjectID('58cd7249d7b0fc2ad0287926')
    // }).toArray().then(function (docs) {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, function(err) {
    //     console.log('Unable to fetch objects');
    // });
    //
    // db.collection('Todos').count({
    //     _id: new ObjectID('58cd7249d7b0fc2ad0287926')
    // }).then(function (count) {
    //     console.log(`Todos count: ${count}`);
    // }, function(err) {
    //     console.log('Unable to fetch objects');
    // });

    db.collection('Users').find({name: 'Vivek'}).toArray(function(err, results) {
       if (err) {
           return console.log('Unable to fetch data', err);
       }

       console.log(JSON.stringify(results, undefined, 2));
    });

    db.close();
});