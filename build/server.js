"use strict";
/*
 * Copyright (C) 2019 Val Cob <valcob@github.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app/app"));
app_1.default.listen(config_1.default.PORT + 1, () => console.log('Listening on port ' + config_1.default.PORT + '!'));

  if (reqMac && reqDevice && reqVersion) {
    var _versions$filter = _version2.default.filter(function (v) {
      var _v$origin = v.origin,
          mac = _v$origin.mac,
          device = _v$origin.device,
          version = _v$origin.version,
          min = _v$origin.min,
          max = _v$origin.max;


      if (device !== reqDevice) return false;
      console.log({ mac: mac, reqMac: reqMac });
      if (mac !== '*' && mac !== reqMac) return false;

      var minVersionCompare = (0, _nodeVersionCompare2.default)(min, reqVersion);
      var maxVersionCompare = (0, _nodeVersionCompare2.default)(reqVersion, max);

      if (min !== '*' && minVersionCompare === 1) return false;

      if (max !== '*' && maxVersionCompare > 0) return false;
      return true;
    }),
        _versions$filter2 = _slicedToArray(_versions$filter, 1),
        _versions$filter2$ = _versions$filter2[0],
        resp = _versions$filter2$ === undefined ? {} : _versions$filter2$;

    var _resp$target = resp.target,
        target = _resp$target === undefined ? {} : _resp$target;

    return res.json(target);
  }
  res.json({});
});

app.listen(3000, function () {
  return console.log('Update server listening on port 3000!');
});