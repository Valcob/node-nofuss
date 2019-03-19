## Use
```
npm install

npm run prod

```

## Test
```
curl --http1.0 -i -X GET\
 -A 'LockerUpdater'\
 -H "X-ESP8266-MAC:00"\
 -H "X-ESP8266-VERSION:1.5.4"\
 -H "X-ESP8266-DEVICE:SONOFF"\
 -H "X-ESP8266-CHIPSIZE:10456021"\
 -H "X-ESP8266-OTASIZE:456021"\
 http://localhost:8267/firmware/update
```
