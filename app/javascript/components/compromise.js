import nlp from 'compromise';

var doc = nlp('London is calling but i want to live in new york and not tel aviv');

console.log(doc.match('#Place').text());
