const http = require('http')
const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const adminRoute = require('./route/admin')
const shopRoute = require('./route/shop')

const page404ctrl = require('./controllers//shopCtrl')
// const expressHbs=require('express-handlebars')
const app = express()

/* for handle bars we will be using app.engine
 app.set('view engine', 'pug' )ss
 app.set('views') 
 */

/*  app.engine('handlebars', expressHbs())
 app.set("view engine", "handlebars")
 app.set('views') 
 this if for handlebars, we will now be using ejs*/

app.set('view engine', 'ejs')
app.set('views', 'views')

//this is middleware here is for parsing the data

// serving sataic pages(the css files in the public folder)
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: true }))

// importing adminjs and using a specific function (route is key holding the value router which is a function). this is no longer being maintained
app.use('/admin', adminRoute)
// app.use('/admin', productRoute.getProduct)

// here we exported the whole file so we are not just targeting a function
app.use(shopRoute)

// rendering an error 404 page
app.use(page404ctrl.get404)

const server = http.createServer(app)
server.listen(3000)

/* Adding a layouts file to the template engine: in ejs you cannot use layouts, but there something called partial layouts/includes which i am going to do down here and explain.
some  code blocks are reused in different parts of our template and therefore we can share them seperated views paths 

look for similarities within your template cut it out and place in a new file then import it in the file that needs them <%-include('path/file')%>
the (-) renders html, while (=) renders text stored in a variable or key in the js
*/

/*  */
