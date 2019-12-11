```js
  calRange(max, min, value) {
    let unit = (max - min) / 100;
    return Math.round(unit * value + min);
  }

  calProgress(max, min, value) {
    let unit = (max - min) / 100;
    return Math.round((value - min) / unit);
  }
```
```js
const _ = require('lodash')

let data = [
    ['白色', '黄色', '绿色'],
    ['M', 'L', 'S'],
    ['货到付款', '不包邮', '包邮']
]

function sku() {

    let result = []
    let results = []
    let only_idx = false

    function rank(arr, depth) {
        for (let i = 0; i < arr[depth].length; i++) {
            result[depth] = only_idx ? i : arr[depth][i]
            if (depth != arr.length - 1) {
                rank(arr, depth + 1)
            } else {
                results.push(_.clone(result))
            }
        }

    }

    rank(data, 0)

    console.log(results)
}

sku()
````
