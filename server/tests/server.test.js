const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
})

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

                Todo.find({}, function (err, res) {
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

    it('should not create todo', function(done) {
        var emptyNote = {};
        request(app)
            .post('/todos')
            .send(emptyNote)
            .expect(400)
            .end(function(err, res) {
                if (err) {
                    return done(err)
                }

                Todo.find(undefined, function(err, todos) {
                    if (err) {
                        return done(err);
                    }
                    expect(todos.length).toBe(0);
                    done();
                });
            });
    });
});

