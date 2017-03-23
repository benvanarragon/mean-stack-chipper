var Todo = require('./models/todo');
var Category = require('./models/category');
var Food = require('./models/food');
var Specials = require('./models/specials');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getCategories(res){
    Category.find(function (err, category){
        if(err){
            res.send(err);
        }

        res.json(category);//return all categories in JSON format
    })
};

function getFoods(res){
    Food.find(function (err, food){
        if(err){
            res.send(err);
        }

        res.json(food);//return all foods in JSON format
    })
};

function getSpecials(res){
    Specials.find(function (err, specials){
        if(err){
            res.send(err);
        }

        res.json(specials);//return all specials in JSON format
    })
};



module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });


    //-------------------------------------------
    // get all categories
    app.get('/api/categories', function (req, res) {
        // use mongoose to get all categories in the database
        getCategories(res);
    });

    //------------------------------------------------
    //get all food
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all categories in the database
        getFoods(res);
    });

     //------------------------------------------------
    //get all specials
    app.get('/api/specials', function (req, res) {
        // use mongoose to get all categories in the database
        getSpecials(res);
    });



    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
