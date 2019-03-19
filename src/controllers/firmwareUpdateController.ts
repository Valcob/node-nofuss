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


import {Request, Response} from 'express';
import {BuildMetaInterface, UpdateInfoInterface} from "../dtos/updateInfoInterface";

const verCompare = require('node-version-compare');
const versions = require('../firmware/version.json');

export class FirmwareUpdateController {

    public checkForUpdates(req: Request, res: Response) {
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
            const resp: UpdateInfoInterface[] = versions.filter((v: UpdateInfoInterface) => {
                console.log("Checking v:", v);
                if (typeof v.origin === "undefined") return false;
                const {mac, device, min, max} = v.origin;

                if (device !== reqDevice) return false;
                console.log({mac, reqMac});
                if (mac !== '*' && mac !== reqMac) return false;

                const minVersionCompare = verCompare(min, reqVersion);
                console.log('[req] minver ', min, reqVersion, minVersionCompare);
                const maxVersionCompare = verCompare(reqVersion, max);
                console.log('[req] maxver ', reqVersion, max, maxVersionCompare);

                console.log('[req] is core? ', Number(isCoreBuild) === 1);
                if (Number(isCoreBuild) === 1) return true; // get the latest for core build
                if (min !== '*' && minVersionCompare === 1) return false;

                if (max !== '*' && maxVersionCompare > 0) return false;
                return true;
            });
            console.log('[req] filtered content: ', resp);
            if (resp.length > 0) {
                const target: BuildMetaInterface = resp[0].target;
                const core: BuildMetaInterface = resp[0].core;
                // if OTAsize + romSize < CHIPsize then we can proceed
                console.log('[req] checking the core + rom < chipsize', Number(core.size) + Number(target.size), Number(chipSize));
                if (Number(core.size) + Number(target.size) < Number(chipSize)) {
                    console.log('[req] sending:', Number(otaSize) > Number(target.size) ? target : core);
                    return res.json(Number(otaSize) > Number(target.size) ? target : core);
                }
            }
        }
        console.log('[req] no updates! for ', reqDevice);
        console.log('\n');
        res.json({});
    }

}