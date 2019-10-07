//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var mysql = require('mysql');
var pool = require('./pool');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
app.set('view engine', 'ejs');


//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());
app.use(cookieParser());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post("/Login", function(req,res) {
    console.log("Inside post login request");
    var isCorrectPassword;
    var username = req.body.username;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);
    bcrypt.compare(password, hash, function(err, res) {
        // res === true
        isCorrectPassword = res;
    });
    var sql = "SELECT FirstName,LastName,Email,PhoneNumber,RestaurantName,RestaurantZipCode,Cuisine,role from userinfo where Email = "+mysql.escape(username);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('error');
            res.sendStatus(500).end('Invalid credentials');
        }
        else {
            res.cookie('cookie', req.body.username, {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            req.session.user = req.body.username;
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful login");
        }    
    })

});

app.get("/profile/:id", function(req,res) {
    console.log("Inside post login request");
    var id = req.params.id;
    var sql = "SELECT FirstName,LastName,Email,PhoneNumber from userinfo where Email = "+mysql.escape(id);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful login");
        }    
    })

});

app.get("/profileOwnerEdit/:id", function(req,res) {
    console.log("Inside profile Owner edit get request");
    var id = req.params.id;
    var sql = "SELECT FirstName,LastName,Email,PhoneNumber,RestaurantName,RestaurantZipCode,Cuisine from userinfo where Email = "+mysql.escape(id);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful Profile edit");
        }    
    })

});

app.post("/profileOwnerEditUpdate", function(req,res) {
    console.log("Inside profile Owner post edit update request");
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var email = req.body.Email;
    var phoneNumber = req.body.PhoneNumber;
    var restaurantName  = req.body.RestaurantName;
    var restaurantZipCode = req.body.RestaurantZipCode;
    var cuisine = req.body.Cuisine;
    var sql = "UPDATE userinfo SET FirstName = "+mysql.escape(firstName)+", LastName = "+mysql.escape(lastName)+", Email = "+mysql.escape(email)+", PhoneNumber = "+mysql.escape(phoneNumber)+", RestaurantName = "+mysql.escape(restaurantName)+", RestaurantZipCode = "+mysql.escape(restaurantZipCode)+", Cuisine = "+mysql.escape(cuisine)+" WHERE Email = "+mysql.escape(email);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful Update");
        }    
    })

});


app.get("/profileEdit/:id", function(req,res) {
    console.log("Inside profile edit login request");
    var id = req.params.id;
    var sql = "SELECT FirstName,LastName,Email,PhoneNumber from userinfo where Email = "+mysql.escape(id);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful Profile edit");
        }    
    })

});

app.post("/profileEditUpdate", function(req,res) {
    console.log("Inside profile post edit update request");
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var email = req.body.Email;
    var phoneNumber = req.body.PhoneNumber;
    console.log
    var sql = "UPDATE userinfo SET FirstName = "+mysql.escape(firstName)+", LastName = "+mysql.escape(lastName)+", Email = "+mysql.escape(email)+", PhoneNumber = "+mysql.escape(phoneNumber)+" WHERE Email = "+mysql.escape(email);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful Update");
        }    
    })

});

app.get("/profileOwner/:id", function(req,res) {
    console.log("Inside post login request");
    var id = req.params.id;
    var sql = "SELECT FirstName,LastName,Email,PhoneNumber,RestaurantName,RestaurantZipCode,Cuisine from userinfo where Email = "+mysql.escape(id);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful login");
        }    
    })

});



app.post("/Signup", function(req,res) {
    console.log("Inside signup login request");
    let sql;
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;
    let buyer = req.body.buyer;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password,salt);
    sql = "INSERT INTO userinfo (FirstName,LastName,Email,Password,role) VALUES ("+mysql.escape(firstName)+","+mysql.escape(lastName)+","+mysql.escape(email)+","+mysql.escape(hash)+","+mysql.escape(buyer)+")" ;   
    
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log('Success');
                    res.end("Successful login");
                }
            })
        }
    });
});

app.post("/OwnerSignup", function(req,res) {
    console.log("Inside owner signup login request");
    let email = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;
    let restaurantName = req.body.restaurantName;
    let restaurantZipCode = req.body.restaurantZipCode;
    let owner = req.body.owner;
    let sql = "INSERT INTO userinfo (FirstName,LastName,Email,Password,RestaurantName,RestaurantZipCode,role) VALUES ("+mysql.escape(firstName)+","+mysql.escape(lastName)+","+mysql.escape(email)+","+mysql.escape(password)+","+mysql.escape(restaurantName)+","+mysql.escape(restaurantZipCode)+","+mysql.escape(owner)+")" ;
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log('Success');
                    res.end("Successful login");
                }
            })
        }
    });
});


const storage = multer.diskStorage({
    destination : path.join(__dirname,".") + "/public/uploads",
    filename : function(req,file,cb) {
        cb(null,"user" + req.params.id + path.extname(file.originalname));
    }
});

const uploads = multer({
    storage : storage,
    limits : {fileSize : 1000000},
}).single("myImage");

app.post("/uploads/:id", function(req,res) {
    uploads(req,res, function(err) {
        console.log("Request -----",req.body);
        console.log("Request file ----",req.file);

        if(!err) {
            return res.sendStatus(200).end();
        }
        else {
            console.log('Error!');
        }
    })
})

app.get("/uploads/:id", function(req,res) {
    var image = path.join(__dirname, ".") + "/public/uploads/user"+req.params.id;
    if(fs.existsSync(image + '.jpg')) {
        res.sendFile(image + '.jpg');
    }
    else if(fs.existsSync(image + '.jpeg')) {
        res.sendFile(image + '.jpeg');
    }
    else if(fs.existsSync(image + '.png')) {
        res.sendFile(image + '.png');
    }
    else {
        res.sendFile(image+'Not Found.png')
    }
})

app.get("/MenuHomePage/:id", function(req,res) {
    console.log("Inside menu home page request");       
    var restaurantName = req.params.id;
    var sql = "SELECT * FROM items WHERE RestaurantName = "+mysql.escape(restaurantName);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            //res.end("Successful login");
        }    
    })

});

app.post("/ItemAddPage", function(req,res) {
    console.log("Inside item add page request");
    let itemName = req.body.itemName;
    let itemDesc = req.body.itemDesc;
    let itemPrice = req.body.itemPrice;
    let itemSection = req.body.itemSection;
    let restaurantName = req.body.restaurantName;
    let sql = "INSERT INTO items (itemName,itemprice,RestaurantName,description,SectionName) VALUES ("+mysql.escape(itemName)+","+mysql.escape(itemPrice)+","+mysql.escape(restaurantName)+","+mysql.escape(itemDesc)+","+mysql.escape(itemSection)+")" ;
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log('Success');
                    res.end("Successful item addition");
                }
            })
        }
    });
});

app.post("/SectionAddPage", function(req,res) {
    console.log("Inside item add page request");
    let sectionName = req.body.sectionName;
    let sectionDesc = req.body.sectionDesc;
    let restaurantName = req.body.restaurantName;
    let sql = "INSERT INTO sections (sectionName,sectionDescription,RestaurantName) VALUES ("+mysql.escape(sectionName)+","+mysql.escape(sectionDesc)+","+mysql.escape(restaurantName)+")" ;
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log('Success');
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});

app.post("/ItemRemovePage", function(req,res) {
    console.log("Inside item add page request");
    let itemName = req.body.itemToRemove;
    let sql = "DELETE FROM items WHERE itemName = "+mysql.escape(itemName);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.send("Something went wrong ! Item not found");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log('Success');
                    res.send(JSON.stringify(result));
                    res.end("Successful item deletion");
                }
            })
        }
    });
});

app.post("/SectionRemove", function(req,res) {
    console.log("Inside item add page request");
    let sectionToRemove = req.body.sectionToRemove;
    let restaurantName = req.body.restaurantName;
    let sql = "DELETE items,sections from items INNER JOIN sections ON items.RestaurantName = sections.RestaurantName WHERE sections.sectionName = "+mysql.escape(sectionToRemove)+" AND items.sectionName = "+mysql.escape(sectionToRemove);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log('Success');
                    res.sendStatus = 200;
                    res.end("Successful section deletion");
                }
            })
        }
    });
});

app.get("/ItemUpdatePage/:id", function(req,res) {
    console.log("Inside item update request");
    var id = req.params.id;
    var sql = "SELECT sectionName, sectionDescription FROM sections WHERE sectionName = "+mysql.escape(id);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful section update");
        }    
    })

});

app.post("/ItemUpdatePage", function(req,res) {
    console.log("Inside item add page request");
    let sectionsName = req.body.sectionsName;
    let sectionName = req.body.sectionName;
    let sectionDesc = req.body.sectionDesc;
    let restaurantName = req.body.restaurantName;
    let sql = "UPDATE sections,items SET sections.sectionName = "+mysql.escape(sectionName)+", items.SectionName = "+mysql.escape(sectionName)+", sections.sectionDescription = "+mysql.escape(sectionDesc)+" WHERE sections.sectionName = "+mysql.escape(sectionsName)+ " AND sections.RestaurantName = "+mysql.escape(restaurantName)+" AND items.RestaurantName = "+mysql.escape(restaurantName)+" AND items.SectionName = "+mysql.escape(sectionsName);
    console.log("Query : "+sql);


    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    //res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});

app.get("/SectionUpdatePage/:id", function(req,res) {
    console.log("Inside item update request");
    var id = req.params.id;
    var sql = "SELECT itemName, description, itemprice FROM items WHERE itemName = "+mysql.escape(id);
    console.log("Query : "+sql);

    pool.query(sql,(err,result) => {
        if(err) {
            console.log('Error : '+err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Wrong credentials");
        }
        else if(result.length == 0) {
            console.log('Invalid credentials');
        }
        else {
            res.cookie("cookie","admin", {
                maxAge: 900000, httpOnly: false, path : '/'
            });
            console.log('Success');
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result));
            res.end("Successful item get");
        }    
    })

});

app.post("/SectionUpdatePage", function(req,res) {
    console.log("Inside section add page request");
    let itemsName = req.body.itemsName;
    let itemName = req.body.itemName;
    let itemDesc = req.body.itemDesc;
    let itemPrice = req.body.itemPrice;
    let restaurantName = req.body.restaurantName;
    let sql = "UPDATE items SET itemName = "+mysql.escape(itemName)+", description = "+mysql.escape(itemDesc)+", itemprice = "+mysql.escape(itemPrice)+" WHERE itemName = "+mysql.escape(itemsName)+ " AND RestaurantName = "+mysql.escape(restaurantName);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    //res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});


app.post("/SearchResults", function(req,res) {
    console.log("Inside search result post request");
    let searchItem = req.body.itemToSearch;
    let sql = "SELECT RestaurantName, itemName, itemprice from items WHERE itemName = "+mysql.escape(searchItem);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else if(result.length == 0) {
                    res.send('Item not found');
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});

app.get("/RestaurantDetailsPage/:id", function(req,res) {
    console.log("Inside restaurant search result post request");
    let restaurantToSearch = req.params.id;
    let sql = "SELECT DISTINCT sectionName from sections WHERE RestaurantName = "+mysql.escape(restaurantToSearch);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});


app.post("/RestaurantItemsPage", function(req,res) {
    console.log("Inside restaurant search result post request");
    let restaurantToSearch = req.body.restaurantName;
    let sectionName = req.body.localsection;
    let sql = "SELECT itemName,itemprice,description from items WHERE SectionName = "+mysql.escape(sectionName)+" AND RestaurantName = "+mysql.escape(restaurantToSearch);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});


/*const storageImage = multer.diskStorage({
    destination : path.join(__dirname,".") + "/public/uploadsItem",
    filename : function(req,file,cb) {
        cb(null,"item-" + req.params.imageId + path.extname(file.originalname));
    }
});

const uploadImage = multer({
    storageImage : storageImage,
    limits : {fileSize : 1000000},
}).single("myItemImage");

app.post("/uploadsItem/:imageId", function(req,res) {
    uploadImage(req,res, function(err) {
        console.log("Request -----",req.body);
        console.log("Request file ----",req.file);

        if(!err) {
            console.log('Successful');
            return res.sendStatus(200).end();
        }
        else {
            console.log('Error!');
        }
    })
})

app.get("/uploadsItem/:imageId", function(req,res) {
    var image = path.join(__dirname, ".") + "/public/uploadsItem/item-"+req.params.imageId;
    if(fs.existsSync(image + '.jpg')) {
        res.sendFile(image + '.jpg');
    }
    else if(fs.existsSync(image + '.jpeg')) {
        res.sendFile(image + '.jpeg');
    }
    else {
        res.sendFile(image + '.png');
    }
})*/

app.post("/CheckoutOrders", function(req,res) {
    console.log("Inside order checkout page request");
    let orderId  = req.body.orderId;
    let itemOrders = req.body.itemNameForOrder;
    let personName = req.body.personName;
    let status = req.body.status;
    let restaurantName = req.body.restaurantName;
    let total = req.body.totalCost;
    console.log(itemOrders.length);
    for(var i = 0;i < itemOrders.length;i++) {
    let sql = "INSERT INTO orders (orderid,RestaurantName,ItemNames,OrderPersonName,Status,Total) VALUES ("+mysql.escape(orderId)+ "," + mysql.escape(restaurantName)+","+mysql.escape(itemOrders[i])+","+mysql.escape(personName)+","+mysql.escape(status)+","+mysql.escape(total)+")" ;
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log(err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end('Error');
                }
                else {
                    console.log('Success');
                    //res.send(JSON.stringify(result));
                    res.end("Successful order sent");
                }
            })
        }
    });
}
});


app.post("/RecentOrderReq", function(req,res) {
    console.log("Inside recent order get request");
    let restaurantToSearch = req.body.restaurantName;
    let sql = "SELECT orderid,ItemNames,OrderPersonName,Status from orders WHERE RestaurantName = "+mysql.escape(restaurantToSearch);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});


app.post("/OrderStatusUpdate", function(req,res) {
    console.log("Inside recent order get request");
    let itemName = req.body.itemName;
    let orderid = req.body.orderid;
    let selectedValue = req.body.selectedValue;
    let sql = "Update orders SET Status = "+mysql.escape(selectedValue)+" WHERE orderid = "+mysql.escape(orderid);
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});

app.post("/GetRecentOrderRequest", function(req,res) {
    console.log("Inside recent order get customer request");
    let orderid = req.body.orderid;
    let totalCost = req.body.orderTotalCost;
    let restaurantName = req.body.restaurantName;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let fullName = firstName + " " + lastName;
    let sql = "SELECT ItemNames,Status,Total,RestaurantName from orders WHERE OrderPersonName = "+mysql.escape(fullName)+" AND Status <> 'Order delivered'";
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong credentials");
                }
                else {
                    res.cookie("cookie","admin", {
                        maxAge: 900000, httpOnly: false, path : '/'
                    });
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});

app.post("/GetDeliveredItems", function(req,res) {
    console.log("Inside recent order get customer request");
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let orderPersonName = firstName +" "+ lastName;
    let sql = "SELECT ItemNames,Status,Total,RestaurantName from orders WHERE OrderPersonName = "+mysql.escape(orderPersonName)+" AND Status = 'Order Delivered'";
    console.log("Query : "+sql);

    pool.getConnection(function(err,con) {
        if(err) {
            console.log(err);
            res.writeHead(400, {
                "Content-Type" : "text/plain"
            });
            res.end("Connection not established");
        }
        else {
            con.query(sql,function(err,result) {
                if(err) {
                    console.log('Error : '+err);
                    res.writeHead(400, {
                        "Content-Type" : "text/plain"
                    });
                    res.end("Wrong data");
                }
                else if(result.length == 0) {
                    console.log('No data received');
                }
                else {
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                    //res.end("Successful section addition");
                }
            })
        }
    });
});

app.listen(3001);
console.log("Server listening on port 3001");


