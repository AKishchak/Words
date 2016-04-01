yaml = require('js-yaml');
fs   = require('fs');

var files = [
  'vocabulary',
  'adjectives',
];

var json = {};

for (var i = 0; i < files.length; i++) {
  try {
    json[files[i]] = (yaml.safeLoad(fs.readFileSync('sources/' + files[i] + '.yaml', 'utf8')));
  } catch (e) {
    console.log('ERROR', e);
  }
}

fs.writeFileSync('dist/words.json', JSON.stringify(json), 'utf8');
