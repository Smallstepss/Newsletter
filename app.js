const express=require("express");

const app=express();

const https=require("https");

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{

        const fName=req.body.fName;
         const lName=req.body.lName;
           const email=req.body.email;


      const data ={
         members:[
           {
             email_address:email,
             status:"subscribed",
             merge_fields:{
               FNAME:fName,
               LNAME:lName
                          }
           }
                ]
               };
const jsonData=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/78f7b0822";

const options={
  method:"POST",
  auth:"reshma1:60aa0da6d0d67d30b3980af13d5aeb1e-us21"
}

const request=https.request(url,options,function(response){

  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }

});

request.write(jsonData);
request.end();
});

/*const postOptions={
  method:"POST",
  auth:"reshma1:60aa0da6d0d67d30b3980af13d5aeb1e-us21"
                  }
const getRequestOptions=
{
  method:"GET",
  auth:"reshma1:60aa0da6d0d67d30b3980af13d5aeb1e-us21"
}
const postRequest=https.request(url,postOptions,function(response)
{
  response.on("data",function(data)
  {
  });
});

const getRequest=https.request(url,getRequestOptions,function(apiResponse)
{
let data="";
  apiResponse.on("data",function(addedData)
  {
    data += addedData;
  });
    apiResponse.on("end",function()
    {
const parsedData=JSON.parse(data);
console.log(parsedData);
      //console.log(jsonData.members[0].status);
      //const status = parsedData.members[0].status;
      //console.log(status);
     // if(status=="subscribed")
      {
       res.write("You have subscribed successfully");
      }
      else
     {
        res.write("sorry pls signup again");
      }
      res.end();
    });
});
postRequest.write(jsonData);
postRequest.end();
getRequest.end();
});
*/
app.post("/failure",function(req,res){

res.redirect("/")});

app.listen(process.env.PORT ||3000,
function(req,res){
  console.log("server is running on port 3000");
});


//API key
//60aa0da6d0d67d30b3980af13d5aeb1e-us21

//Audience/List  ID
//78f7b08225
