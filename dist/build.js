yaml = require('js-yaml');
fs   = require('fs');

var files = [
  'vocabulary',
  'adjectives',
  'other',
  'sentences',
  'adverbs',
];

var json = {};

for (var i = 0; i < files.length; i++) {
  try {
    json[files[i]] = (yaml.safeLoad(fs.readFileSync('sources/' + files[i] + '.yaml', 'utf8')));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



var verbs = {};

for (var i = 0; i < files.length; i++) {
  try {
    verbs = (yaml.safeLoad(fs.readFileSync('sources/verbs.yaml', 'utf8')));
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

fs.writeFileSync('dist/verbs.json', JSON.stringify(verbs), 'utf8');
fs.writeFileSync('dist/words.json', JSON.stringify(json), 'utf8');
