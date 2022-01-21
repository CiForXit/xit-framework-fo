import Swal from 'sweetalert2';
import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {IApiResponse} from '../model/ApiModel';
import Alert from 'react-s-alert';

const XitCmm = {
  //const request: (options: object) => {
  // const headers = new Headers({
  //   'Content-Type': 'application/json',
  // })
  //
  // if(localStorage.getItem(ACCESS_TOKEN)) {
  //   headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  // }
  //
  // const defaults = {headers: headers};
  // options = Object.assign({}, defaults, options);
  //
  // return fetch(options.url, options)
  // .then(response =>
  //   response.json().then(json => {
  //     if(!response.ok) {
  //       return Promise.reject(json);
  //     }
  //     return json;
  //   })
  // );
  //},

  // requestApi: async (
  //   methodType: string,
  //   url: string,
  //   params: any,
  //   headers: any
  // ): Promise<AxiosResponse<IApiResponse>> => {
  //   console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);
  //   console.table(params);
  //
  //   headers = Object.assign({'Content-Type': 'application/json;charset=UTF-8'}, headers); //, "Authorization": session.get('token')};
  //   let options: any = {
  //     url: process.env.NODE_ENV === 'development' ? url : process.env.REACT_APP_API + url,
  //     method: methodType,
  //     headers: headers
  //   };
  //   // get 요청은 body 없이 call
  //   if (methodType.toLocaleLowerCase() === 'get') options = {...options, params};
  //   else options = {...options, data: params};
  //
  //   // 요청 처리
  //   let res: IApiResponse;
  //   try {
  //     res = await axios(options); //{...config, ...options});//.then(res => {
  //   } catch (e) {
  //     console.log(`@@@@@@@@@@@ requestApi EXCEPTION @@@@@@@@@@@@@`);
  //     Alert.error(`<p>${e}</p>`);
  //   } finally {
  //   }
  //   if (res !== undefined && res.success && res.data.success) {
  //     console.log(JSON.stringify(res.data));
  //     Alert.success(`처리되었습니다`);
  //   } else {
  //     console.log(`@@@@@@@@@@@ requestApi ERROR @@@@@@@@@@@@@`);
  //     let code = res.data.code != null ? `[${res.data.code}]` : '';
  //     await SweetAlert.fire({
  //       title: `Inpix Administrator`,
  //       html: `<p>${res.data.message} ${code}</p>`,
  //       //footer: 'Copyright 2018',
  //       timer: 3000
  //     });
  //   }
  //   return res.data;
  // },

  /**
   * validation check error message
   * @param message
   */
  alertParam: (message: string) => {
    Swal.fire({
      icon: 'warning',
      html: message,
      //imageUrl:
      timer: 3000
    }).then((r) => {});
    return false;
  },

  /**
   * API Error message
   * @param message
   */
  alertError: (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'API error',
      html: message,
      //imageUrl:
      timer: 3000
    }).then((r) => {});
    return false;
  },

  /**
   *
   * @return [value: string, onchange: (e: ChangeEvent<HTMLInputElement>) => void]
   * @param initalValue
   * @param validator
   */

  useInput<T>(
    initalValue: T,
    validator?: (value: string) => boolean
  ): [T, Dispatch<SetStateAction<T>>, (e?: React.ChangeEvent<HTMLInputElement>) => void] {
    const [value, setValue] = useState<typeof initalValue>(initalValue);
    const changer = useCallback(
      (e) => {
        const v = e.target.value;
        if (validator === undefined || validator(v)) {
          setValue(v);
        }
      },
      [validator]
    );

    return [value, setValue, changer];
  },

  /**
   * form 데이타를 JSON 으로 return
   * @param frm
   * @returns {string}
   */
  // getJsonFromForm: (frm: HTMLFormElement): string => {
  //   let formData = new FormData(frm),
  //     result = {};
  //
  //   // Iteration protocols : for of을 사용하여야만 한다
  //   // Iteration 객체의 특징
  //   for (let entry of formData.entries()) {
  //     result[entry[0]] = entry[1];
  //   }
  //   formData.forEach((v, k) => (result[k] = v));
  //   return JSON.stringify(result);
  // },

  /**
   * 현재 URL에서 파라메터 GET
   * @param name
   * @returns string
   */
  getParameterByName: (name: string) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(window.location.search);
    return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  /**
   * 현재 URL의 파라메터를 JSON으로 return
   * @returns {}
   */
  // getQuery: () => {
  //   let url: string = document.location.href;
  //   let qs: Array<any> = url.substring(url.indexOf('?') + 1).split('&');
  //   let result: Object = {}
  //   for (let i = 0; i < qs.length; i++) {
  //     qs[i] = qs[i].split('=');
  //     result[qs[i][0]] = decodeURIComponent(qs[i][1]);
  //   }
  //   return result;
  // },

  /**
   * 현재 URL에서 파라메터 GET
   * @param name
   * @returns {string|number|null}
   */
  urlParam: (name: string) => {
    //var url = decodeURIComponent(window.location.href);
    let results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
      return null;
    } else {
      return results[1] || 0;
    }
  },

  /**
   * 현재 URL에서 파라메터 GET
   * @param paramName
   * @returns {string}
   */
  getParameters: (paramName: string) => {
    // 리턴값을 위한 변수 선언
    let returnValue;

    // 현재 URL 가져오기
    let url = window.location.href;

    // get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
    let parameters = url.slice(url.indexOf('?') + 1, url.length).split('&');

    // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
    for (let i = 0; i < parameters.length; i++) {
      let varName = parameters[i].split('=')[0];
      if (varName.toUpperCase() === paramName.toUpperCase()) {
        returnValue = parameters[i].split('=')[1];
        return decodeURIComponent(returnValue);
      }
    }
  },

  /**
   *
   * @param name - The name of the cookie to be set
   * @param value - The value of the cookie
   * @param expireDays
   */
  setCookie: (name: string, value: string, expireDays: number = 1) => {
    let todayDate = new Date();
    todayDate.setTime(todayDate.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expired = todayDate.toISOString(); //.toGMTString();
    document.cookie = `${name} = ${escape(value)}; expires = ${expired}; path=/`;
  },

  /**
   *
   * @param name
   */
  getCookie: (name: string) => {
    return document.cookie.split(';').some((c) => {
      return c.trim().startsWith(name + '=');
    });
  },

  /**
   *
   * @param name - The name of the cookie to be set
   * @param value - The value of the cookie
   */
  removeCookie: (name: string, value?: string) => {
    if (!value) document.cookie = `${name}=Max-Age=-99999999;`;
    else document.cookie = `${name}=${encodeURIComponent(value)}${{expires: 'Sun, 01-May-2019 14:00:00 UTC'}}`;
  }
};
export default XitCmm;
