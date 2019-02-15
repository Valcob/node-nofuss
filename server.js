import verCompare from 'node-version-compare';
import express from 'express';
import versions from './firmware/version';

console.log('starting in ', __dirname);

const app = express();
app.use('/firmware/update', express.static(__dirname + '/firmware'));
app.get('/firmware/update', (req, res) => {
  const [reqMac, reqDevice, reqVersion, isCoreBuild, chipID, chipSize, otaSize] = [
    'X-ESP8266-MAC',
    'X-ESP8266-DEVICE',
    'X-ESP8266-VERSION',
    'X-ESP8266-COREBUILD',
    'X-ESP8266-CHIPID',
    'X-ESP8266-CHIPSIZE',
    'X-ESP8266-OTASIZE'
  ].map(v => req.get(v.toLowerCase()));

  console.log('[req]', new Date(), reqMac, reqDevice, reqVersion, isCoreBuild, chipID, chipSize, otaSize, req.headers);

  if (reqMac && reqDevice && reqVersion) {
    const [resp = {}] = versions.filter(v => {
      if (typeof v.origin === "undefined") return false;
      const { mac, device, version, min, max } = v.origin;

      if (device !== reqDevice) return false;
      console.log({ mac, reqMac });
      if (mac !== '*' && mac !== reqMac) return false;

      const minVersionCompare = verCompare(min, reqVersion);
      console.log('[req] minver ', min, reqVersion, minVersionCompare);
      const maxVersionCompare = verCompare(reqVersion, max);
      console.log('[req] maxver ', reqVersion, max, maxVersionCompare);

      console.log('[req] is core? ', isCoreBuild, Number(isCoreBuild) === 1);
      if ( Number(isCoreBuild) === 1 ) return true; // get the latest for core build
      if (min !== '*' && minVersionCompare === 1) return false;

      if (max !== '*' && maxVersionCompare > 0) return false;
      return true;
    });
    console.log('[req] filtered contend: ', resp);
    const { target = {}, core = {} } = resp;
    // if OTAsize + romSize < CHIPsize then we can proceed
    console.log('[req] chekcing the core + rom < chipsize', Number(core.size) + Number(target.size), Number(chipSize));
    if( Number(core.size) + Number(target.size) < Number(chipSize) ) {
        console.log('[req] sending:', Number(otaSize) > Number(target.size) ? target : core);
        return res.json(Number(otaSize) > Number(target.size) ? target : core);
    }
  }
  console.log('[req] no updates! for ', reqDevice);
  console.log('\n');
  res.json({});
});

// app.use((req, res, next) => {
// 	console.log('[req]', req);
// 	next();
// });

// app.use(function (err, req, res, next) {
//   console.log('[req] ERROR:', err);
//   next();
// });

app.listen(8267, () => console.log('Update server listening on port 8267!'));
