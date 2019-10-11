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
    let responseData = [];
    return await this.setResult(res); 
  }

  async setResult (response: any) {
    let responseData = [];
    if( response && response.data[0]) {
      //console.dir( response.data[0]);

      if(response.data[0].length) {
        for (const iterator of response.data[0]) {
          // console.log('response.data[iterator] :',iterator );
          if(iterator) {
            await responseData.push(this.replaceWavesToNdx(iterator));
          }
         
        }
      }
      else {
         responseData.push(this.replaceWavesToNdx(response.data));
      }
    }
    return await responseData;
  }

  async getAllHostData(url: string, typeHost: Host) {
    const checkUrl = this.checkNdx(url);
    const urlFinish = `${HostUrl.getUrl(typeHost)}${checkUrl}`;
    console.log('urlFinish :', urlFinish);
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
    if(data) {
      const flatObj = flatten(data);
      for (const key in flatObj) {
        if (flatObj.hasOwnProperty(key) && typeof flatObj[key] === 'string' && flatObj[key] === 'WAVES' || flatObj[key] === 'Waves') {
          flatObj[key] = 'NDX';
        }
        if (flatObj[key] && typeof flatObj[key] === "object" && flatObj[key].toString() !== '{}') {
            const newObj = flatten(flatObj[key]);
            console.log('newObj :', newObj);
            for (const keyObj in newObj) {
              if (newObj.hasOwnProperty(keyObj) && typeof newObj[keyObj] === 'string' && newObj[keyObj] === 'WAVES' || flatObj[key] === 'Waves') {
                newObj[keyObj] = 'NDX';
              }
            }
            flatObj[key] = newObj;
            console.log('newObj After :', flatObj[key]);
        } 
      }
      return unflatten(flatObj);
    }
    
  }
}
