$(document).ready(function(){
    
    $("#btnSignup").click(function(){
        
        let obj={
            type:"get",
            url:"/signup-details",
            data:{
                txtEmail:$("#txtEmail_signup").val(),
                txtPwd:$("#txtPwd_signup").val(),
                utype:$("#utype").val(),
                status:1
            }
        }
        $.ajax(obj).done(function(resp)
        {
            alert(resp);

        }).fail(function(err)
        {
            alert(err.statusText);
        })

     });
  /////////////////////////////////////////////////////
    $("#btnLogin").click(function(){
        let obj={
            type:"get",
            url:"/check-login-details",
            data:{
                txtEmail:$("#txtEmail_login").val(),
                txtPwd:$("#txtPwd_login").val()
            }
        }
        $.ajax(obj).done(function(jsonAry)
        {
            if($.isEmptyObject(jsonAry))
            {
                alert("Invalid User Cridentials");
            }
            else
            {
                if(jsonAry[0].status==1)
                {
                    
                    if(jsonAry[0].utype==="Influencer")
                    {
                        location.href="infl-dash.html";
                        localStorage.setItem("activeuser",$("#txtEmail_login").val());

                    }
                    else if(jsonAry[0].utype==="Collaborator")
                    {
                      //  location.href="infl-finder.html";
                      location.href="client-dash.html"; 
                      localStorage.setItem("activeuser",$("#txtEmail_login").val());
                    }
                }
                else
                {
                    alert("Blocked...");
                }
                
            }

        }).fail(function(err)
        {
            alert(err.statusText);
        })

});
////////////////////////////////////////////////////////////
$("#btnEmail_infl").click(function(){
    let obj={
        type:"get",
        url:"/find-user-details",
        data:{
            txtEmail:$("#txtEmail").val()
        }
    }
    $.ajax(obj).done(function(jsonAry)
    {
        if(jsonAry.length==0)
        {
            alert("Invalid ID");
            return;
        }
       // alert(JSON.stringify(jsonAry));
        $("#txtPwd").val(jsonAry[0].pwd);//table colu. wala
        $("#txtDob").val(jsonAry[0].dob.split("T")[0]);//table colu. wala
        // alert(jsonAry[0].dob);
        $("#prev").prop("src",jsonAry[0].picpath);
        $("#prev").val(jsonAry[0].picpath);
        $("#txtName").val(jsonAry[0].iname);
        $("#txtGender").val(jsonAry[0].gender);
        $("#txtAdd").val(jsonAry[0].address);
        $("#txtCity").val(jsonAry[0].city);
        $("#txtContact").val(jsonAry[0].contact);
        $("#txtField").val(jsonAry[0].field.split(","));    
        $("#txtInsta").val(jsonAry[0].insta);
        $("#txtYt").val(jsonAry[0].yt);
        $("#txtOther").val(jsonAry[0].other);
        $("#btnSave").prop("disabled",true);
        $("#btnUpdate").prop("disabled",false);
    }).fail(function(err)
    {
        alert(err.statusText);
    })

});
/////////////////////////////////////////////////
$("#btnPostEvent").click(function(){
        
    let obj={
        type:"get",
        url:"/post-event-details",
        data:{
            txtEmail:$("#txtEmail_PostEvent").val(),
            txtPwd:$("#txtPwd_PostEvent").val(),
            txtEvent:$("#txtEvent_PostEvent").val(),
            txtDate:$("#txtDate_PostEvent").val(),
            txtTime:$("#txtTime_PostEvent").val(),
            txtVenue:$("#txtVenue_PostEvent").val()
        }
    }
    $.ajax(obj).done(function(resp)
    {
        alert(resp);

    }).fail(function(err)
    {
        alert(err.statusText);
    })

  });
//*****************************************************************************/
$("#btnSettings_update").click(function(){
        
    let obj={
        type:"get",
        url:"/update-login-details-settings",
        data:{
            txtEmail:$("#txtEmail_settings").val(),
            txtoldPwd:$("#txtPwd_old_settings").val(),
            txtnewPwd:$("#txtPwd_new_settings").val(),
            txtrepPwd:$("#txtPwd_rep_settings").val()
        }
    }
    $.ajax(obj).done(function(resp)
    {
        alert(resp);

    }).fail(function(err)
    {
        alert(err.statusText);
    })

 });
//  ////////////////////////////////////////////////////////////////////////////////
$("#btnEmail_client").click(function(){
    let obj={
        type:"get",
        url:"/find-user-details-client",
        data:{
            txtEmail:$("#txtEmail").val()
        }
    }
    $.ajax(obj).done(function(jsonAry)
    {
        if(jsonAry.length==0)
        {
            alert("Invalid ID");
          
            return;
        }
       // alert(JSON.stringify(jsonAry));
       //table colu. wala
        //table colu. wala
        // $("#prev").prop("src","uploads/"+jsonAry[0].picpath);
        // $("#prev").val(jsonAry[0].picpath);
        $("#txtName").val(jsonAry[0].iname);
        $("#txtGender").val(jsonAry[0].gender);
        // $("#txtAdd").val(jsonAry[0].address);
        $("#txtCity").val(jsonAry[0].city);
        $("#txtState").val(jsonAry[0].state);
        $("#txtMob").val(jsonAry[0].contact);
        $("#txtType").val(jsonAry[0].type);
        $("#btnSave").prop("disabled",true);
        $("#btnUpdate").prop("disabled",false);
        // $("#txtField").val(jsonAry[0].field.split(","));
        // $("#txtInsta").val(jsonAry[0].insta);
        // $("#txtYt").val(jsonAry[0].yt);
        // $("#txtOther").val(jsonAry[0].other);
    }).fail(function(err)
    {
        alert(err.statusText);
    })

});
});
