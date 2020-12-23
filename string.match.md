```js
const _ = require('lodash')
const regexp = /NO|YES/g;
const str = 'NOYESNOYES';

const array = [...str.matchAll(regexp)];

console.log(_.map(array, ([h]) => h));
```
