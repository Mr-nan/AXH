import *as api from './api'

export function getCheckImage() {
    return new Promise((resolve, reject)=>{
        fetch(api.getCheckImageCodeURL)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('------------url',api.getCheckImageCodeURL);
            resolve(responseJson.body);
        })
        .catch((error) => {
            reject('网络异常');
        });
    })
  }

export function sendCode(number,imgCode){
     let bodyData = {header:{
         app:"kbpos-apiplatform",pageNum:0,pageSize:0},
         body:{mobile:number,smsCode:imgCode,realData:0}};

    return new Promise((resolve, reject)=>{
        fetch(api.sendCodeURL,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.header.code!='10000'){
                reject(responseJson.header.message);

           }else{
            resolve(responseJson.body);

           }
            console.log('------------',responseJson);
        })
        .catch(() => {
            reject('网络异常');
        });
    })
}

export function login(number,imgCode,code,token){
    let bodyData = {header:{
        app:"kbpos-apiplatform",pageNum:0,pageSize:0},
        body:{mobile:number,smsCode:code,code:imgCode,token}};

   return new Promise((resolve, reject)=>{
       fetch(api.loginURL,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(bodyData)
       })
       .then((response) => response.json())
       .then((responseJson) => {
        console.log('------------url',api.loginURL);
           console.log('------------bodyData',bodyData);
           console.log('------------responseJson',responseJson);
           if(responseJson.header.code!='10000'){
                reject(responseJson.header.message);

           }else{
             resolve(responseJson);
           }
       })
       .catch(() => {
          reject('网络异常');
     });
   })
}

export function getBrowseData(number){
    let bodyData = {header:{
        app:"kbpos-apiplatform",pageNum:0,pageSize:0},
        body:{mobile:number}};

   return new Promise((resolve, reject)=>{
       fetch(api.browseDataURL,{
           method: 'POST',
           headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(bodyData)
       })
       .then((response) => response.json())
       .then((responseJson) => {
        console.log('------------bodyData',bodyData);
           console.log('------------responseJson',responseJson);
           if(responseJson.header.code!='10000'){
                reject(responseJson.header.message);

           }else{
             resolve(responseJson.body);
           }
       })
       .catch(() => {
          reject('网络异常');
     });
   })
}