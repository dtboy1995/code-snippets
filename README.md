# vscode
`    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",`

# code-snippets
config code snippets

### nginx http common
```nginx
server {
    listen 80;
    server_name [domain];

    location / {
        proxy_pass http://localhost:[port];
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```
### vue spa common http
```nginx
server {
    listen 80;
    server_name [domain];
    root [dir]/dist;
    index index.html;

    location /favicon.ico {
        root [dir]/dist;
    }

    location / {
        try_files $uri /index.html;
    }

    location = /index.html {
        expires -1;
    }
}
```

### mongodb 3.2 yum repos
```yum
[MongoDB]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7/mongodb-org/3.2/x86_64
gpgcheck=0
enabled=1
```

### mongodb common config
```mongodb
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true

processManagement:
  fork: true  # fork and run in background
  pidFilePath: /var/run/mongodb/mongod.pid  # location of pidfile

net:
  port: 27017
#  bindIp: 127.0.0.1  # Listen to local interface only, comment to listen on all interfaces.

security:
  authorization: enabled
```
### http 301 to https

- http config

```nginx
server {
    listen          80;
    server_name     ithot.org;
    return 301      https://$server_name$request_uri;
}
```

- https config

```nginx
server {
    listen 443;
    server_name ithot.org;
    ssl on;
    ssl_certificate /etc/nginx/cert/214450036080552.pem;
    ssl_certificate_key /etc/nginx/cert/214450036080552.key;
    ssl_session_timeout 5m;

    location / {
        proxy_pass http://localhost:7000;
    }
}
```

- dns

| type | record | value |
| :- | :- | :- |
| A | @ | 220.181.112.244 |
| dominant url | www | https://ithot.org |


### 阿里云短信
```coffeescript
config    = require 'config'
Promise   = require 'bluebird'
AliSms    = require 'ali-sms-callback'

client = new AliSms
  AccessKeyId: '-',
  AccessKeySecret: '-'

module.exports =

  TEMPLATE:
    REGISTER: 'SMS_126865294'
    FINDBACK: 'SMS_121905212'

  sendTemplateSMS: (template, phone, vars) ->
    new Promise (resolve, reject) ->
      options =
        SignName: 'EnglishICO'
        TemplateCode: template
        TemplateParam: JSON.stringify vars
        PhoneNumbers: phone
      client.SendSms options, (err, data) ->
        if err?
          reject err
        else
          resolve data

```
### 小程序更新
app.js `onLaunch()`
```js
const manager = wx.getUpdateManager();
    manager.onCheckForUpdate(res => {
      logger.debug(res);
    });
manager.onUpdateReady(() => {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        manager.applyUpdate();
      }
    }
  });
});
manager.onUpdateFailed(err => {
  logger.debug(err);
});
```
