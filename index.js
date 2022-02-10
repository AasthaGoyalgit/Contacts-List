const { Console } = require('console');
const express = require('express');
const path = require('path');  //inbuilt module it donot need to install
const port = 8000;


const db = require('./config/mongoose');
const Contact = require('./models/contact');

//fetch all express functionality which are require to run a server
const app = express(); 


//template engine  =>  setting value to the property present in app from server to html
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views')); //look out the folder 'views' under __dirname
app.use(express.urlencoded());  //to use parser to encode data -> it is a middleware , parser will store the browser data or form datain req.body
// app.use signifies middleware to interact or access with request as well as response and can update or transform the data that's why parser decoded the browser data and covert into key value pair and add it to req.body
app.use(express.static('assets'));  //access static file to style the website



/************Middleware********** */
/*
app.use(function(req, res, next){
    req.myName="Aastha";
    console.log("Middleware 1 called");
    next();
})

app.use(function(req, res, next){
    console.log("from mw2",myName);
    console.log("Middleware 2 called");
    next();
})
*/


var contactList=[
    {
        name:'Aastha',
        phone:'2334728642'
    },
    {
        name:'Tony Stark',
        phone:'94689472842'
    },
    {
        name:'BoatCEO',
        phone:'958392789427'
    }
]


/**************** Get request => Main page controller***********/
app.get('/', function(req, res){
    // console.log(__dirname);        //directory from which server is started
    // res.send('<h1>Cool, it is running! or is it?</h1>');
    // console.log("from get route controller ",myName);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contact');
            return;
        }
        
        return res.render('home', {
            title: 'My Contacts List',
            contact_List: contacts
        });

    });

    // return res.render('home', {
    //     title: 'My Contacts List',
    //     contact_List: contactList
    // });
});



/**********************Practice Controller******************/
app.get('/practice',function(req, res){
  return res.render('practice', {
      title: 'Lets play with EJS'
    });
});



/**********************Contact Controller******************/
// redirect will redirect at the given url
app.post('/create-contact', function(req, res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
  
    //Added parsed data to contact list
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });


    // contactList.push(req.body);

    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
         if(err){
             Console.log('error in creating a contact!')
              return;
        };

        console.log('************', newContact);
        return res.redirect('back');

    });


    // return res.redirect('/');
    // return res.redirect('back');  back to the same screen
})



/**********************Delete contact Controller******************/
//using string params
// app.get('/delete-contact/:phone', function(req,res){
//     console.log(req.params);
//     let phone = req.params.phone;
// })

//using query params
app.get('/delete-contact', function(req,res){
    //get query from url
    // let phone = req.query.phone;
    //get id from query in th url
    let phone = req.query.id;

   /* let contactIndex = contactList.findIndex( contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, contactIndex+1);
    }
    console.log(contactIndex);*/


    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting an object from database");
            return;
        }
        
        return res.redirect('back'); 

    })
    // return res.redirect('back');
})







/******************running server or listening requests****************/
app.listen(port, function(err){
    if(err){
        console.log('Error in running a server ', err);
        return;
    }
    console.log('Yup! My Express server is running at port: ', port);
});