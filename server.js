var express = require("express");
var fileuploader=require("express-fileupload");
let app=express();
var mysql2=require("mysql2");
var nodemailer = require('nodemailer');  
var cloudinary = require('cloudinary').v2;

app.listen(2009,function()
{
    console.log("Server Started ....... at this host");
})
app.use(express.static("public"));
app.use(express.urlencoded("true"));
app.use(fileuploader());

//  let config = {
//      host :"127.0.0.1",
//      user:"root",
//      password:"Vansh@123#",
//      database:"june2024",
//      dateStrings:true
//  }

//  let config = {
//     host :"bhr4ar2xmpslzteabz3m-mysql.services.clever-cloud.com",
//     user:"u7ouu0c8owsx2cvm",
//     password:"QugWXO7oqik1TrIKDY9I",
//     database:"bhr4ar2xmpslzteabz3m",
//     dateStrings:true,
//     keepAliveInitialDelay : 10000,
//     enableKeepAlive : true,
// }

cloudinary.config({ 
    cloud_name: 'deyyjtqmb', 
    api_key: '258419894551616', 
    api_secret: '-oFJNgEUaxkg-mVZNnRER4JV1Ew' // Click 'View Credentials' below to copy your API secret
});

let config = "mysql://avnadmin:AVNS_vB1gMDCcs5mROiGfu0B@mysql-d7eb1d8-singlavanshpc-6103.g.aivencloud.com:26369/defaultdb"

 var mysql = mysql2.createConnection(config);
 mysql.connect(function(err)
 {
     if(err==null)
         console.log("Connected to Database Successfully");
     else
     console.log(err.message+"  ########");
 })
 ///////////////////////////////////////////////////
 
/////////////////////////////////////////////////////////////////////
var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure : true,
    port : 465,
    auth: {
      user: 'singlavanshpc@gmail.com',
      pass: 'hsnu pexg ddaa puds',
    },
  });
/////////////////////////////////////////////////////
app.get("/",function(req,resp)
{
    let path = __dirname+"/public/index.html";
    resp.sendFile(path);
})
///////////////////////////////////////////////////////////////////////////
app.get("/signup-details",function(req,resp)
 {
     let txtEmail = req.query.txtEmail;
     let txtPwd = req.query.txtPwd;
     let utype=req.query.utype;
     let status=req.query.status;
     mysql.query("insert into users values(?,?,?,?)",[txtEmail,txtPwd,utype,status],function(err)
    {
         if(err==null)
             resp.send("Your Record is Successfully Saved");
         else
             resp.send(err.message);
    })
 })
/////////////////////////////////////////////////

app.get("/check-login-details",function(req,resp)
{
    let txtEmail= req.query.txtEmail;
    let txtPwd = req.query.txtPwd;
    console.log(txtEmail);
    console.log(txtPwd);
    mysql.query("select * from users where email=? and pwd=?",[txtEmail,txtPwd],function(err,resultJsonAry){
     
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
        console.log(resultJsonAry);
        resp.send(resultJsonAry); 
    })

})
///////////////////////////////////////////////////
// Influencer profile details
app.post("/iprofile-save-details",async function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
            fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
           // req.files.ppic.mv(path);

            await cloudinary.uploader.upload(path)
            .then(function(result){

                fileName = result.url;

            })

        }
        else
        {
            fileName="nopic.jpg";
            let path=__dirname+"/public/uploads/"+fileName;
            await cloudinary.uploader.upload(path)
            .then(function(result){

                fileName = result.url;

            })
        }
        
   
    mysql.query("insert into iprofile values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.txtEmail,fileName,req.body.txtName,req.body.txtGender,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtField.toString(),req.body.txtInsta,req.body.txtYt,req.body.txtOther],function(err)
    {
            if(err==null)
                    resp.redirect("result.html");
                else
                    resp.send(err.message);
    })
})
///////////////////////////////////////////////////////////////////////////////////
app.post("/iprofile-update-details",async function(req,resp)
{
    let fileName="";
    if(req.files!=null)
        {
             fileName=req.files.ppic.name;
            let path=__dirname+"/public/uploads/"+fileName;
         //   req.files.ppic.mv(path);
            await cloudinary.uploader.upload(path)
            .then(function(result){

                fileName = result.url;

            })
        }
        else
        {
            fileName=req.body.hdn;
            // let path=__dirname+"/public/uploads/"+fileName;
            // await cloudinary.uploader.upload(path)
            // .then(function(result){

            //     fileName = result.url;

            // })

        }

    mysql.query("update iprofile set picpath=?, iname=? , gender=?, dob=? ,address=? ,city=? ,contact=? ,field=? ,insta=? ,yt=? ,other=? where email=?",[fileName,req.body.txtName,req.body.txtGender,req.body.txtDob,req.body.txtAdd,req.body.txtCity,req.body.txtContact,req.body.txtField.toString(),req.body.txtInsta,req.body.txtYt,req.body.txtOther,req.body.txtEmail],function(err,result)
    {
        if(err==null)//no error
        {
               if(result.affectedRows>=1) 
                resp.redirect("result.html");
                else
                    resp.send("Invalid Email ID");
        }
    else
        resp.send(err.message);
    })

})
///////////////////////////////////////////////////////

//Search Email id-Influencer
app.get("/find-user-details",function(req,resp)
{
    let email= req.query.txtEmail;
   
    mysql.query("select * from iprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

})

//***************************************************************************/
app.get("/post-event-details",function(req,resp)
 {
     let txtEmail = req.query.txtEmail;
     let txtPwd = req.query.txtPwd;
     let txtEvent = req.query.txtEvent;
     let txtDate = req.query.txtDate;
     let txtTime = req.query.txtTime;
     let txtVenue = req.query.txtVenue;
     mysql.query("insert into events values(null,?,?,?,?,?,?)",[txtEmail,txtPwd,txtEvent,txtDate,txtTime,txtVenue],function(err)
    {
         if(err==null)
         {
            console.log(txtEmail,txtPwd,txtEvent,txtDate,txtTime,txtVenue); 
            resp.send("Your Record is Successfully Saved");
         }
         else
             resp.send(err.message);
    })
 })

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.get("/update-login-details-settings",function(req,resp)
 {
     let txtEmail = req.query.txtEmail;
     let txtPwd = req.query.txtPwd;
     let txtoldPwd = req.query.txtoldPwd;
     let txtnewPwd = req.query.txtnewPwd;
     let txtrepPwd = req.query.txtrepPwd;
     if(txtnewPwd===txtrepPwd)
     {
         mysql.query("update users set pwd=? where email=? and pwd=?",[txtnewPwd,txtEmail,txtoldPwd],function(err,result)
         {
         if(err==null)//no error
         {
                if(result.affectedRows>=1) 
                    resp.send("Updated  Successfulllyyyy....");
                 else
                     resp.send("Invalid Email ID");
         }
         else
         resp.send(err.message);
       })
  
    }
    else
    {
        resp.send("Invalid user Cridentials...");
    }
     
 })
 //*********************************************************************************/
 app.post("/login-forget-password",function(req,resp)
 {
    let email=req.body.txtEmail_login;
    let txtPwd_forget="hello";
    mysql.query("select pwd from users where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;
            }
      //  console.log(resultJsonAry);
            // resp.send(resultJsonAry);
            txtPwd_forget = resultJsonAry[0].pwd;
            console.log(txtPwd_forget);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                secure : true,
                port : 465,
                auth: {
                  user: 'singlavanshpc@gmail.com',
                  pass: 'hsnu pexg ddaa puds',
                },
              });
   
              console.log(txtPwd_forget)
              var mailOptions = {
                  from: 'singlavanshpc@gmail.com',
                  to: req.body.txtForget_login,
                  subject: 'Sending Email using Node.js',
                  
                  text: txtPwd_forget
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                    resp.redirect("result2.html");
                  }
                });
    })
})
//////////////////////////////////////////////////////////////////////////////////////
app.get("/fetch-all",function(req,resp)
{
    mysql.query("select * from users",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
//////////////////////////////////////////////////////////////////////////
app.get("/del-one",function(req,resp)
{
    mysql.query("delete from users where email=?",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})
//////////////////////////////////////////////////////////////////////////////////////////
app.get("/block-one",function(req,resp)
{
    let status = 0;
    mysql.query("update users set status=? where email=?",[status,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Blocked");
       
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////
app.get("/resume-one",function(req,resp)
{
    let status = 1;
    mysql.query("update users set status=? where email=?",[status,req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Resumed");
       
    })
})
////////////////////////////////////////////////////////////////////////////////////////
app.get("/fetch-all-influencers",function(req,resp)
{
    mysql.query("select * from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
          //  console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
//()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()()
app.get("/fetch-all-fields",function(req,resp)
{
    mysql.query("select distinct field from iprofile",function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
////////////////////////////////////////////////////////////////////////////////////
app.get("/fetch-some-field",function(req,resp)
{
    let field=req.query.field;
    mysql.query("select city from iprofile where field=?",[field],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
////////////////////////////////////////////////////////////////////////////////////////////
app.get("/fetch-all-details-selected-infl",function(req,resp)
{
    let city=req.query.city;
    mysql.query("select * from iprofile where city=?",[city],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
//////////////////////////////////////////////////////////////////////////////////////////////
app.get("/fetch-some-name",function(req,resp)
{
    let name=req.query.name;
    mysql.query("select * from iprofile where iname like ?",["%"+name+"%"],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
       resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
///////////////////////////////////////////////////////////////////////////////////////////
app.get("/fetch-future-events",function(req,resp)
{
    
    mysql.query("select * from events where email=? and dob>current_date()",[req.query.email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
           // console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/delete-future-events",function(req,resp)
{
    mysql.query("delete from events where email=? and dob=? and timee=?",[req.query.email,req.query.dob,req.query.timee],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
            resp.send("Deleted");
       
    })

})
// *************************************************************************************************
app.post("/cprofile-save-details",function(req,resp)
{
   // console.log(req.body.txtEmail,req.body.txtName,req.body.txtMob,req.body.txtType.toString(),req.body.txtState.toString(),req.body.txtCity,req.body.txtGender);
    mysql.query("insert into cprofile values(?,?,?,?,?,?,?)",[req.body.txtEmail,req.body.txtName,req.body.txtMob,req.body.txtType,req.body.txtState,req.body.txtCity,req.body.txtGender],function(err)
    {
            if(err==null)
                
                resp.redirect("result.html");
                else
                    resp.send(err.message);
    })
})
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
app.post("/cprofile-update-details",function(req,resp)
{
    mysql.query("update cprofile set iname=? , contact=?, type=? ,state=? ,city=? ,gender=? where email=?",[req.body.txtName,req.body.txtMob,req.body.txtType,req.body.txtState,req.body.txtCity,req.body.txtGender,req.body.txtEmail],function(err,result)
    {
        if(err==null)//no error
        {
               if(result.affectedRows>=1) 
                resp.redirect("result.html");
                else
                    resp.send("Invalid Email ID");
        }
    else
        resp.send(err.message);
    })

})
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&7&&&&&&&&&&&&&&&&&&&&&&&&&&&
app.get("/find-user-details-client",function(req,resp)
{
    let email= req.query.txtEmail;
   
    mysql.query("select * from cprofile where email=?",[email],function(err,resultJsonAry){
        if(err!=null)
            {
                resp.send(err.message);
                return;

            }
        console.log(resultJsonAry);
            resp.send(resultJsonAry);//sending array of json object 0-1
    })

})
// ///////////////////////////////////////////////////////////////////////////
app.get("/send-email-influencer",function(req,resp){

    let cltemail=req.query.cltemail;
    let email=req.query.email;
    console.log(email);
    console.log(cltemail);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'singlavanshpc@gmail.com',
        pass: 'hsnu pexg ddaa puds'
      }
    });
    
    
    var mailOptions = {
      from: 'singlavanshpc@gmail.com',
      to: email,
      subject: 'NEW BOOKING ',
      text: 'CLIENT INFORMATION '+cltemail
    };
    
    transporter.sendMail(mailOptions, function(err, info){
      if(err!=null){
        resp.send(err.message);
      } else {
        resp.send("Email Send Successfully...");
      }
    });
    
    })