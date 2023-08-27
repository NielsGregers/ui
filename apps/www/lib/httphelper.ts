// import {
//     IPublicClientApplication,
//     InteractionRequiredAuthError,
//     Logger,
//     InteractionStatus,
//     AccountInfo,
//   } from "@azure/msal-browser";
  
  import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
  //import { logVerbose } from "./logging";
  const sleep = (ms: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), ms);
    });
  };
  
  export interface Result<T> {
    hasError: boolean;
    timedOut?: boolean;
    errorMessage?: string;
    data?: T;
  }
  
  export const https = <T>(
    token: string,
    method: Method,
    url: string,
    data?: any,
    contentType?: string,
    additionalAxiosConfig?: AxiosRequestConfig
  ): Promise<Result<T>> => {
    return new Promise((resolve, reject) => {
      var headers : any  = {
        "Content-Type": contentType ? contentType : "application/json",
        Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly",
        ConsistencyLevel:"eventual"
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
  
      var config: AxiosRequestConfig = {
        method,
        data,
        url,
        headers,
        ...additionalAxiosConfig,
      };
      //logVerbose("https",method,url)
      const send = (retryNumber: number) => {
        axios(config)
          .then(function (response) {
            
            var data = response.data;
  
            resolve({ hasError: false, data ,errorMessage:""});
          })
          .catch(async (error: AxiosError) => {
            if (
              error?.response?.status === 404 ||
              error?.response?.status === 401 ||
              error?.response?.status === 400
            ) {
              resolve({
                hasError: true,
              
                errorMessage:
                  error.message ,
              });
              return;
            }
            if (retryNumber < 3) {
              await sleep(1000 * (retryNumber + 1));
              send(retryNumber + 1);
            } else {
              resolve({
                hasError: true,
                errorMessage:
                  error.message ,
              });
            }
          });
      };
      send(0);
    });
  };
  
  export const httpsGetAll = <T>(
    token: string,
    url: string
  ): Promise<Result<T[]>> => {
    return new Promise( (resolve, reject) => {
      var data: T[] = [];
      const next = async (nexturl: string) => {
        var response = await https<any>(token, "GET", nexturl);
        
        if (response.hasError) {
          resolve({ hasError: true, errorMessage: response.errorMessage });
  
          return;
        }
        data.push(...response.data.value);
        if (response.data["@odata.nextLink"]) {
          next(response.data["@odata.nextLink"]);
        } else {
          resolve({ hasError: false, data });
          return;
        }
      };
      next(url);
    });
  };
  

  
  var lastProgress: string = "";
  export const consoleShowProgress = (text: string) => {
    lastProgress = text;
    process.stdout.write("\b".repeat(text.length) + text);
  };
  
  export const consoleClearProgress = () => {
    process.stdout.write("\b".repeat(lastProgress.length));
  };
  
