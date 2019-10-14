import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as dotenv from "dotenv";
import { Host, HostUrl } from './host';
const flatten = require('flat');
const unflatten = require('flat').unflatten;
dotenv.config();

@Injectable()
export class AppService {
  async getAllReq(url: string, headers: any, typeHost: Host): Promise<any> {
    const res = await this.getAllHostData(url, headers, typeHost);
    return this.setResult(res);
  }

  setResult(response: any) {
    let responseData;
    if (typeof response === 'string') {
      responseData = response;
    } else if (response && typeof response.data === 'string') {
      responseData = response.data;
    }
    else if (response && response.data && response.data[0]) {
      responseData = []
      if (response.data[0].length) {
        for (const iterator of response.data[0]) {
          if (iterator) {
            responseData.push(this.replaceWavesToNdx(iterator));
          }
        }
      }
    }
    else if (response && response.data) {
      
      if (response.data.data) {
        responseData = []        
        if (response.data.data[0] && response.data.data[0].data) {
          responseData.push(this.replaceWavesToNdx(response.data.data[0].data));
        }
      } else {
        responseData = this.replaceWavesToNdx(response.data);
      }
      
    }
    return responseData;
  }

  async getAllHostData(url: string, headers: any, typeHost: Host) {
    const checkUrl = this.checkNdx(url);
    const urlFinish = `${HostUrl.getUrl(typeHost)}${checkUrl}`;
    console.log('urlFinish :', urlFinish);
    //console.log('headers.timestamp :', headers.timestamp);
    try {
      return await this.reqByAxios(urlFinish, headers); 
        
    } catch (error) {
      // console.error(error)
      if (error.response) {
        // console.log('error.response.data :', error.response.data);
        return error.response.data;
      }
    }
  }

  async reqByAxios(url: string, headerData: any) {
    const headData = {
      timestamp: headerData.timestamp,
      signature: headerData.signature
  } 
    try {
      return await Axios.get(url
        , {
           headers:  (headerData.timestamp && headerData.signature) ? headData : {}
         
       }
       ) 
  } catch(error) {
    // console.error(error)
    if (error.response) {
      // console.log('error.response.data :', error.response.data);
      return error.response.data;
    }
  }
}

checkNdx(name: string): string {
  return name.includes('NDX') ? name.replace(/NDX/gi, 'WAVES') : name;
}

replaceWavesToNdx(data) {
  if (data) {
    const flatObj = flatten(data);
    for (const key in flatObj) {
      if (flatObj.hasOwnProperty(key) && typeof flatObj[key] === 'string' && flatObj[key] === 'WAVES' || flatObj[key] === 'Waves') {
        flatObj[key] = 'NDX';
      }
      if (flatObj[key] && typeof flatObj[key] === "object" && flatObj[key].toString() !== '{}') {
        const newObj = flatten(flatObj[key]);
        for (const keyObj in newObj) {
          if (newObj.hasOwnProperty(keyObj) && typeof newObj[keyObj] === 'string' && newObj[keyObj] === 'WAVES' || flatObj[key] === 'Waves') {
            newObj[keyObj] = 'NDX';
          }
        }
        flatObj[key] = newObj;
      }
    }
    return unflatten(flatObj);
  }
}
}
