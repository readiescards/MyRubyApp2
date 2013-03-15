function make_base_auth(user, password) {
  var tok = user + ':' + pass;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
}

function reqListener() {
    console.log(this.responseText);
};

function reqTaskListener() {
    var $servertime = $('.servertime');

    var newHTML;
    newHTML = "<p>Tasks found ";
    newHTML += "</p>";
    $servertime.html(newHTML);
};

function processServerTime(serverTimeXML) {
    var $servertime = $('.servertime');

    var timeXML = $(serverTimeXML);
    var time = timeXML.find('time').text();

    var newHTML;
    newHTML = "<p>ServerTime: ";
    newHTML += time;
    newHTML += "</p>";
    $servertime.html(newHTML);
} ;

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
  alert("An error occurred while transferring the file.");
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

    fetchServerTimeError: function() {
        var $servertime=$('.servertime')
        $servertime.html("error");
    },

    fetchServerTime: function(){
        //var $servertime=$('.servertime')
        //$servertime.html("<h1>fred</h1>");
        //$servertime.fadeIn(250);
        //$servertime.animate({right : 100px},250);

        var url='http://192.168.0.8:22002/time.xml';
        var data;
        $.get(url,processServerTime).error(this.fetchServerTimeError);

//      $.get(url,
//          function (data, textStatus, XMLHttpRequest){
//              alert("status " + textStatus);
//              alert('data:' + data);
//              window.data=data;
//              window.textStatus=textStatus;
//        window.httpReq = XMLHttpRequest});


        var oReq = new XMLHttpRequest();
        oReq.addEventListener("progress", updateProgress, false);
        oReq.addEventListener("load", transferComplete, false);
        oReq.addEventListener("error", transferFailed, false);
        oReq.addEventListener("abort", transferCanceled, false);
        oReq.addEventListener("loadend", loadEnd, false);

//req.upload.addEventListener("progress", updateProgress, false);
//req.upload.addEventListener("load", transferComplete, false);
//req.upload.addEventListener("error", transferFailed, false);
//req.upload.addEventListener("abort", transferCanceled, false);

        oReq.onload = reqListener;
        oReq.open("get", url, true);
        oReq.send();
    },

    fetchTasks: function() {
        var url='http://192.168.0.8:22002/v1/tasks.xml';
        var data;

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("progress", updateProgress, false);
        oReq.addEventListener("load", transferComplete, false);
        oReq.addEventListener("error", transferFailed, false);
        oReq.addEventListener("abort", transferCanceled, false);
        oReq.addEventListener("loadend", loadEnd, false);

        oReq.onload = reqTaskListener;
        oReq.open("get", url, true, "paul", "paul");
//            invocation.setRequestHeader('X-PINGARUNER', 'pingpong');
//            invocation.setRequestHeader('Content-Type',
//'application/xml');
//                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //oReq.withCreditionals=true;
//xmlhttp.setRequestHeader "Authorization", "Basic dXNlcm5hbWU6cGFzc3dvcmQ="

        oReq.send();
    },

    initialize: function() {
        //window.setTimeout(this.fetchServerTime,1000);
        window.setTimeout(this.fetchTasks,200);
        //this.fetchServerTime();
    }

};

app.initialize();