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
```config
[MongoDB]
name=MongoDB Repository
baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7/mongodb-org/3.2/x86_64
gpgcheck=0
enabled=1
```

### mongodb common config
```config
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

```config
server{
    listen          80;
    server_name     ithot.org;
    return 301      https://$server_name$request_uri;
}
```

- https config

```config
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
