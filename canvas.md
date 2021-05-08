```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        canvas {
            display: none;
        }

        img {
            width: 100%;
            height: auto;
        }
    </style>
</head>

<body>
    <div>
        <canvas id="canvas" width="1280" height="720" style="border: 1px solid #bdbdbd;"></canvas>
        <img id="img" src="" alt="">
    </div>

    <script>
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        const IMG_URL = `https://media.sketchfab.com/models/95f792ba8f9e4c2a881d07b310278a26/fallbacks/0f972f5f57ca47e7b4003f570ac13a67/66f6edbabf8c432fb5cad2d942f94081.jpeg?t=${Date.now()}`
        let img = new Image()
        let imgs = []
        let imgdom = document.getElementById('img')
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (options) => {
            let width = 1280;
            let height = 720;
            let step = img.width / width
            for (let i = 0; i < step; i++) {
                context.drawImage(img, 0 + i * width, 0, width, height, 0, 0, width, height);
                let data = canvas.toDataURL('image/jpeg') // image/png
                imgs.push(data)
            }
            draw(0)
        }
        img.src = IMG_URL
        window.draw = function (i) {
            imgdom.src = imgs[i]
        }
    </script>

</body>

</html>
```
