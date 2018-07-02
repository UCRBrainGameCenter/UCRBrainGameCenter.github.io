function OnClick()
{
    var input = document.getElementById("textinput").value;
    var result;

    //lambda call on input

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