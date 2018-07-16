function OnClick()
{
    var input = document.getElementById("textinput").value;
    var result;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://r6irmiu26k.execute-api.us-east-1.amazonaws.com/Production/bgc-to-json",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "file": "work!!!",
          "Cache-Control": "no-cache",
          "Postman-Token": "42823dfd-c7d5-f035-1f20-6fb37402c7e8"
        },
      
        "processData": false,
        "data": input
    }

      $.ajax(settings).done(function (response) {
        console.log(response);
      });

    result = input;

    if(result != null)
    {
        var dialog = bootbox.dialog({
            message: '<center><h5 style="color: #77B300">Parsing was a success</h5></center>' +
            '<textarea readonly class="form-control" id="output" rows="8">' + result + '</textarea>',
            buttons: {
                copyToClipboard: {
                    label: "Copy to Clipboard",
                    className: 'btn-info',
                    callback: function()
                    {
                        const output = document.getElementById("output");
                        output.select();
                        document.execCommand("copy");
                    }

                }
            }
        });
    }

    else
    {
        var dialog = bootbox.dialog({
            message: '<center><h5 style="color: #CC0000">Parsing failed</h5></center>',
            className: 'bg-danger',
            backdrop: true,
            onEscape: true
        });
    }
}