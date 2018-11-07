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
