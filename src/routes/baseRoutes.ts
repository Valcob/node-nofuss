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


import {Request, Response} from "express";
import express = require("express");
import {FirmwareUpdateController} from "../controllers/firmwareUpdateController";

export class Routes {

    public firmwareUpdateController = new FirmwareUpdateController();

    public routes(app: express.Application): void {

        app.route('/firmware/update')
            .get(this.firmwareUpdateController.checkForUpdates);
    }
}