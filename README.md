# Pushwoosh Web SDK sample

## Preparations

Clone project `git clone https://github.com/Pushwoosh/web-push-notifications-sample.git`

Open `src/manifest.json` and make the following changes:

* Change `name` and `short_name` to the name of your website.
* Change `gcm_sender_id` to your Google Project Number. Please keep in mind that Google Project Number is usually a 12-digit number, and it can't contain any letters.

Open `src/index.html` and make the following changes:

* Change `applicationCode` to your Pushwoosh Application Code.
* Change `safariWebsitePushID` to your [Safari Website Push ID](http://docs.pushwoosh.com/docs/safari-website-notifications#1-registering-with-apple).

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pushwoosh Web SDK Sample</title>

    <link rel="manifest" href="/manifest.json">
    <script src="https://cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js" async></script>
    <script>
        var Pushwoosh = Pushwoosh || [];
        Pushwoosh.push(["init", {
          logLevel: 'error', // possible values: error, info, debug
          applicationCode: 'XXXXX-XXXXX',
          safariWebsitePushID: 'web.com.example.domain',
          defaultNotificationTitle: 'Pushwoosh',
          defaultNotificationImage: 'https://cp.pushwoosh.com/img/logo-medium.png',
          autoSubscribe: true,
          userId: 'user_id',
          tags: {
            'Name': 'John Smith'
          }
        }]);
    </script>
</head>
<body>
    <h1>Pushwoosh Web SDK usage sample</h1>
</body>
</html>
```

## Run via npm

Requires installed [Node.js](https://nodejs.org)

1. Open in terminal directory with cloned project `cd web-push-notifications-sample/`
2. Install dependencies `npm install`
3. Run http-server `npm start`
4. Open `http://localhost:3003` in your browser

## Debug mode

Open `src/debug/index.html` and make the following changes:
* Change `applicationCode` to your Pushwoosh Application Code.
* Change `safariWebsitePushID` to your [Safari Website Push ID](http://docs.pushwoosh.com/docs/safari-website-notifications#1-registering-with-apple).

Open `http://localhost:3003/debug/` in your browser.

## Run on your server

Your server must have [secure origins](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features).

Copy all these files from `src/` folder to top-level root of your website directory:

* `manifest.json`
* `pushwoosh-service-worker.js`
* `index.html` *

\* If you already have some html rendering system, insert this code inside `<head></head>` tag:

```html
<link rel="manifest" href="/manifest.json">
<script src="https://cdn.pushwoosh.com/webpush/v3/pushwoosh-web-notifications.js" async></script>
<script>
    var Pushwoosh = Pushwoosh || [];
    Pushwoosh.push(["init", {
      logLevel: 'error', // possible values: error, info, debug
      applicationCode: 'XXXXX-XXXXX',
      safariWebsitePushID: 'web.com.example.domain',
      defaultNotificationTitle: 'Pushwoosh',
      defaultNotificationImage: 'https://cp.pushwoosh.com/img/logo-medium.png',
      autoSubscribe: true,
      userId: 'user_id',
      tags: {
        'Name': 'John Smith'
      }
    }]);
</script>
```
