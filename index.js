var SphinxClient = require ("sphinxapi"),
  _os = require('os'),
  _source = _os.hostname(),
  _interval = parseInt(process.argv[2]) || 1000,
  _host = process.argv[3] || 'localhost',
  _port = parseInt(process.argv[4]) || 9312;

var _last = null;
var cl = new SphinxClient();
cl.SetServer(_host, _port);

function poll()
{
  cl.Status(function(err, result) {
    if(!err) {
      if(_last != null) {
        printResults(result);
      }
      _last = result;
    }
    setTimeout(poll, _interval);
  });
}

function printResults(r) {
  for(var item in r) {
    if(r[item] != 'OFF') {
      if(item.indexOf('avg_') == '-1' && item.indexOf('uptime') == '-1') {
        console.log('SPHINX_' + item.toUpperCase() + ' %d %s', r[item] - _last[item], _source);
      }
      else {
        console.log('SPHINX_' + item.toUpperCase() + ' %d %s', r[item], _source);
      }
    }
  }
}

poll();
