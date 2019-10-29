import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import * as dotenv from "dotenv";
import { Host, HostUrl } from './helpers/host';
import { ConvertTo } from './helpers/utils';
const flatten = require('flat');
const unflatten = require('flat').unflatten;
dotenv.config();

@Injectable()
export class AppService {
  iter = 0;
  async getAllReq(url: string, headers: any, typeHost: Host): Promise<any> {
    const newReq = `${this.iter.toString()}: GET ${url}`;
    this.iter++;
    const res = await this.getAllHostData(url, headers, typeHost);
    if (res) {
      if (typeHost === Host.API) {
        return await this.setResult(res);
      } if (typeHost === Host.NDX_NODE) {
        const res1 = await this.setResult(res);
        return res1;
      } if (typeHost === Host.DEX) {
        const res1 = await this.setResult(res);
        return res1;
      } else {
        // return await this.setResult(res);
      }
    }
  }

  async postAllReq(url: string, headers: any, typeHost: Host, body: any): Promise<any> {
    const res = await this.postAllHostData(url, headers, typeHost, body);
    const newReq = `${this.iter.toString()}: POST ${url}`;
    this.iter++;
    if (res && res.data) {
      return await this.setResult(res.data);
    } else {
      return await this.setResult(res);
    }
  }

  async postAllHostData(url: string, headers: any, typeHost: Host, body: any) {
    let checkUrl = this.checkNdx(url);
    const urlFinish = `${HostUrl.getUrl(typeHost)}${checkUrl}`;
    body = this.iterateObj(body, ConvertTo.NDX);
    try {
      return await Axios.post(urlFinish, body)
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  setResult(response: any) {

    let responseData;
    if (typeof response === 'string') {
      responseData = response;
    } else if (response && typeof response.data === 'string') {
      responseData = response.data;

    } else if (response && response.data) {
      console.log('2 :');
      if (response.data && response.data.length) {
        responseData = [];
        response.data = this.iterateObj(response.data, ConvertTo.NDX)[0];
        responseData.push(response.data);
        console.log('3 :');
      } else if (response.data && response.data.length && response.data[0].data) {

        responseData = []
        response.data[0].data = this.iterateObj(response.data[0].data, ConvertTo.NDX);
        responseData.push(response.data);
        console.log('4 :');
      } else if (response.data && response.data && response.data.data) {
        response.data.data = this.iterateObj(response.data.data, ConvertTo.NDX);
        responseData = response.data;
        console.log('5 :');
      }
      else if (response.data && !response.data.length) {
        response.data = this.iterateObj(response.data, ConvertTo.NDX);
        console.log('6 ');
        responseData = response.data;
      }
    } else {
      responseData = [];
    }
    return responseData;
  }

  iterateObj(obj: any, direction: ConvertTo) {
    let newObjRespose: any;
    if (!this.isArray(obj)) {
      newObjRespose = this.replaceWavesAndNdx(obj, direction);
    } else if (obj.length) {

      const totalLength = obj.length;
      const arrForManyObj = [];
      for (let i = 0; i < totalLength; i++) {
        if (!this.isArray(obj[i])) {
          arrForManyObj.push(this.replaceWavesAndNdx(obj[i], direction));
        } else if (this.isArray(obj[i]) && !this.isArray(obj[i][0])) {
          newObjRespose = [];
          newObjRespose.push(this.iterateObj(obj[i], direction));
        } else if (this.isArray(obj[i]) && this.isArray(obj[i][0])) {
          newObjRespose = [];
          const subArr = [];
          for (let j = 0; j < obj[i].length; j++) {
            subArr.push(obj[i][j]);
          }
          newObjRespose.push(subArr);
        }
      }

      if (arrForManyObj.length) {
        newObjRespose = arrForManyObj;
      }

    } else {
      newObjRespose = [];
    }
    return newObjRespose;
  }

  async getAllHostData(url: string, headers: any, typeHost: Host) {
    let checkUrl = this.checkNdx(url);
    const urlFinish = `${HostUrl.getUrl(typeHost)}${checkUrl}`;
    try {
      const resp = await this.reqByAxios(urlFinish, headers);
      if (urlFinish.includes('utils/time')) {
      }
      return resp;

    } catch (error) {
      if (error.response) {
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
          headers: (headerData.timestamp && headerData.signature) ? headData : {}
        }
      )
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }

  checkNdx(name: string): string {
    return name.includes('NDX') ? name.replace(/NDX/gi, 'WAVES') : name;
  }

  isArray(obj: any) {
    return obj.constructor.prototype.hasOwnProperty('push');
  }

  replaceWavesAndNdx(data: any, direction: ConvertTo) {
    let checketId: string;
    let checketCapitalId: string;
    let replcedId: string;
    if (direction === ConvertTo.NDX) {
      checketId = 'Waves';
      checketCapitalId = 'WAVES';
      replcedId = 'NDX';
    } else {
      checketId = 'NDX';
      checketCapitalId = 'NDX';
      replcedId = 'WAVES';
    }
    if (data) {
      const flatObj = flatten(data);
      for (const key in flatObj) {
        if (flatObj.hasOwnProperty(key) && typeof flatObj[key] === 'string' && flatObj[key] === checketCapitalId || flatObj[key] === checketId) {
          flatObj[key] = replcedId;
        }
        if (flatObj[key] && typeof flatObj[key] === "object" && flatObj[key].toString() !== '{}') {
          const newObj = flatten(flatObj[key]);
          for (const keyObj in newObj) {
            if (newObj.hasOwnProperty(keyObj) && typeof newObj[keyObj] === 'string' && newObj[keyObj] === checketCapitalId || flatObj[key] === checketId) {
              newObj[keyObj] = replcedId;
            }
          }
          flatObj[key] = newObj;
        }
      }
      return unflatten(flatObj);
    }
  }
}
