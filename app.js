const Express       = require("express");
const BodyParser    = require("body-parser");
const Cors          = require("cors");
const Routes        = require("./Routes");
const Passport      = require("passport");

const app = Express();

app.use(Cors());
app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());

app.use('/' , Routes);

app.listen(8093 , (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }

    console.log("server is running port 8093");
})