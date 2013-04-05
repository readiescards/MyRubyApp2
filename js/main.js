        function login()
        {
        var txt="";
        try
        {
            if(document.getElementById("username").value == "" || document.getElementById("passwd").value == "" )
            {
                alert('Fill out both username and password, please...');
                return false;
            }
            var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            xhr.open("get", "http://192.168.0.8:22005/v1/me.xml",false,"PaulRead","PaulRead");
            xhr.send("");
            if (xhr.status == 200)
            {
                document.getElementById("console").innerHTML = xhr.responseText;
            }
            else
            {
                alert('Wrong credentials...');
                document.getElementById("console").innerHTML = xhr.responseText;
            }
            return false;
        }
        catch(err)
        {
          txt="There was an error on this page.\n\n";
  txt+="Error description: " + err.message + "\n\n";
  txt+="Click OK to continue.\n\n";
  alert(txt);
        }
        }

function make_base_auth(user, password) {
  var tok = user + ':' + pass;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
}

function reqListener() {
    console.log(this.responseText);
};

function reqMeListener() {
    var $me = $('.servertime');

    var newHTML;
    newHTML = "<p><h1>me</h1>";
newHTML+=this.responseText;
    newHTML += "</p>";
    $me.html(newHTML);
};

function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = evt.loaded / evt.total;
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  //alert("The transfer is complete.");
}

function transferFailed(evt) {
  alert("An error occurred during transfer.");
}

function transferCanceled(evt) {
  //alert("The transfer has been canceled by the user.");
}

function loadEnd(e) {
  //alert("The transfer finished (although we don't know if it succeeded or not).");
}

var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    fetchMe: function()
    {
        var txt="";
        try
        {
        var url='http://192.168.0.8:22005/v1/me.xml';
        var basicAuth;

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("progress", updateProgress, false);
        oReq.addEventListener("load", transferComplete, false);
        oReq.addEventListener("error", transferFailed, false);
        oReq.addEventListener("abort", transferCanceled, false);
        oReq.addEventListener("loadend", loadEnd, false);

        oReq.onload = reqMeListener;
        oReq.open("get", url, true);

      basicAuth = "Basic " + Base64.encode("PaulRead:PaulRead",Base64.NO_WRAP );
      oReq.setRequestHeader("Authorization", basicAuth);
        //oReq.withCreditionals=true;

        oReq.send("");
    }
    catch(err)
    {
          txt="There was an error on this page.\n\n";
  txt+="Error description: " + err.message + "\n\n";
  txt+="Click OK to continue.\n\n";
  alert(txt);
    }
    },

    initialize: function() {
        window.setTimeout(this.fetchMe,200);
    }

};

app.initialize();