var SphinxClient = require ("sphinxapi"),
    _source = _os.hostname(),
    _interval = parseInt(process.argv[1]) || 1000,
    _host = process.argv[2] || 'localhost',
    _port = parseInt(process.argv[3]) || 19312;

var _last;

function poll()
{
        var cl = new SphinxClient();
        cl.SetServer(_host, _port);
        cl.Status(function(err, result) {
                if(!err) {
                  console.log('SPHINX_TOTAL_CON %d %s', result.connections, _source);
                }
                setTimeout(poll, _interval);
        });
}

poll();
