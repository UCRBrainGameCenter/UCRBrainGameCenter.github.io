function OnClick()
{
    var input = document.getElementById("textinput").value;
    var result;

    var intro = "{\n \"body\": {\"bgc\": \"";
    var ending = "\"\n}}";

    var text = input.split("\"").join("\\\"");
    text = text.split("\n").join("\\n");
    text = intro + text + ending;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://84cje3rj4j.execute-api.us-east-1.amazonaws.com/Production/bgc-to-json",
        "method": "POST",
        "headers": {
          "access-control-allow-origin": "*",
          "Content-Type": "application/json",
          "file": "work!!!",
          "Cache-Control": "no-cache",
          "Postman-Token": "42823dfd-c7d5-f035-1f20-6fb37402c7e8"
        },
        
        "dataType": "json",
        "processData": false,
        "data": text,
        "error": function (xhr, error)
        {
            console.debug(xhr);
            console.debug(error);
            createErrorModal(null, 
                "Could not send to Server, is your CORS plugin enabled?" +
                '\n <a href="https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/">Firefox CORS Addon</a>' +
                '\n <a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en">Chrome CORS Addon</a>')
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        result = response;

        if(result["errorType"] != null)
        {
            createErrorModal(result["errorType"], result["errorMessage"])
        }
        else
        {
            result = result["body"];
            var dialog = bootbox.dialog({
                message: '<center><h5 style="color: #77B300">Parsing was a success</h5></center>' +
                '<textarea readonly class="form-control" id="output" rows="8">' + result + '</textarea>',
                buttons: {
                    copyToClipboard: {
                        label: "Copy to Clipboard",
                        className: 'btn-info center',
                        callback: function()
                        {
                            const output = document.getElementById("output");
                            output.select();
                            document.execCommand("copy");

                            return false;
                        }
                    }
                }
            });
        }
    });
}

function createErrorModal(ErrorType, ErrorMessage)
{
    if(ErrorType != null)
    {
        ErrorType += ': ';
    }
    else
    {
        ErrorType = "";
    }

    var dialog = bootbox.dialog({
        message: '<center><h5 style="color: #CC0000">Parsing failed</h5></center>' +
        '<h6>' + ErrorType + ErrorMessage + '<h6>',
        backdrop: true,
        onEscape: true
    });
}
