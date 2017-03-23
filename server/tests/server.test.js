const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var testNotes = [{
    _id:  new ObjectID(),
    text: 'First Note'
}, {
    _id:  new ObjectID(),
    text: 'Second Note'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
            return Todo.insertMany(testNotes);
        }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text: text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text: text}, function (err, res) {
                    if (err) {
                        console.log(err);
                        return done(e);
                    }
                    expect(res.length).toBe(1);
                    expect(res[0].text).toBe(text);
                    done();
                })
            });
    });

    it('should not create todo', function (done) {
        var emptyNote = {};
        request(app)
            .post('/todos')
            .send(emptyNote)
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }

                Todo.find(undefined, function (err, todos) {
                    if (err) {
                        return done(err);
                    }
                    expect(todos.length).toBe(2);
                    done();
                });
            });
    });
});

describe('GET/todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    console.log(`/todos/${testNotes[0]._id.toHexString()}`);
    it('should return todo doc', (done) => {
       request(app)
           .get(`/todos/${testNotes[0]._id.toHexString()}`)
           .expect(200)
           .expect((res) => {
              expect(res.body.todo.text).toBe(testNotes[0].text);
           })
           .end(done);
    });

    it('should return a 404 when no note is found', (done) => {
        var fakeObjectID = new ObjectID();
        request(app)
            .get(`/todos/${fakeObjectID}`)
            .expect(404)
            .end(done);
    });

    it('should return a 404 when non ObjectID is passed', (done) => {
       request(app)
           .get(`/todos/123`)
           .expect(404)
           .end(done);
    });
});
