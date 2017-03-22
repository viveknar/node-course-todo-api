const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = '58d22afe713b58308a323b0c'

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });
//
// Todo.findOne({
//     _id:id
// }).then((todo) => {
//     console.log('Todo: ', todo);
// });

if(!ObjectID.isValid(id)) {
    console.log('not a valid id');
}

Todo.findById(id).then((todo) => {
    console.log('Todo:',id);
}).catch((e) => {
    console.log(e);
});