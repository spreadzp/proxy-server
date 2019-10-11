import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as dotenv from "dotenv";
import { Host, HostUrl } from './host';
const flatten = require('flat');
const unflatten = require('flat').unflatten;
dotenv.config();

@Injectable()
export class AppService {
  async getAllReq(url: string, typeHost: Host): Promise<any> {
    const res = await this.getAllHostData(url, typeHost);
    let responseData = res; 
    if(res && res.data) {
      responseData = (typeof res.data === 'string' ) ? res.data : this.replaceWavesToNdx(res.data);
    } else {
      responseData = res;
    }
    return responseData;
  }

  async getAllHostData(url: string, typeHost: Host) {
    const checkUrl = this.checkNdx(url);
    try {
      return await Axios.get(`${HostUrl.getUrl(typeHost)}${checkUrl}`)
    } catch (error) {
      // console.error(error)
      if(error.response) {
        return error.response.data;
      }
    }
  }
  
  checkNdx(name: string): string {
    return name.includes('NDX') ? name.replace(/NDX/gi, 'WAVES') : name;
  }

  replaceWavesToNdx(data) {
    const flatObj = flatten(data);
    for (const key in flatObj) {
      if (flatObj.hasOwnProperty(key) && typeof flatObj[key] === 'string' && flatObj[key] === 'WAVES' || flatObj[key] === 'Waves') {
        flatObj[key] = 'WAVES';
      }
      if (flatObj[key] && typeof flatObj[key] === "object" && flatObj[key].toString() !== '{}') {
          const newObj = flatten(flatObj[key]);
          console.log('newObj :', newObj);
          for (const keyObj in newObj) {
            if (newObj.hasOwnProperty(keyObj) && typeof newObj[keyObj] === 'string' && newObj[keyObj] === 'WAVES' || flatObj[key] === 'Waves') {
              newObj[keyObj] = 'WAVES';
            }
          }
          flatObj[key] = newObj;
          console.log('newObj After :', flatObj[key]);
      } 
    }
    return unflatten(flatObj);
  }
}
