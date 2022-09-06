import axios, { AxiosRequestConfig } from "axios";
import { Api } from "../constants";
import {notification} from 'antd'
import { signOut } from "next-auth/react";
export const myAxios = axios.create({
  baseURL: Api,
});

export const fetcher = (url:string) => myAxios.get(url)
.then((res) => res.data)
.catch(error=>notification["error"]({
    message: "Notification Error",
    description: error.message,
  })
  );

  // export const swrFetcher = (url: string, config?: AxiosRequestConfig<any> | undefined) => myAxios.get(url, config).then(res => res.data)
export const fetchWithToken = (url: string, token: string) => myAxios.get(url, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
    .then(res => res.data)
    .catch(err => {
        console.log({ err })

        if (err.response?.data.status === 'TokenExpiredError') {
          notification["warning"]({
            message: "Notification Warning!",
            description:err.response?.data?.message || '',
          })
          signOut()
            
        } else {
            notification[err.response?.data?.icon === 'warning' ? 'warn' : 'error']({
                message: 'Notification error!!!',
                description:
                    err.response?.data?.message || err?.response?.data?.error || err?.message || '',
            });
        }
    })

export const messageError = (err: any) => {
    if (err.response?.data.status === 'TokenExpiredError') {
      notification["warning"]({
        message: "Notification Warning!",
        description:err.response?.data?.message || '',
      })
      signOut()
    } else {
        notification[err.response?.data?.icon === 'warning' ? 'warn' : 'error']({
            message: err.response?.data?.icon === 'warning' ? 'แจ้งเตือน' : 'เกิดข้อผิดพลาด!!',
            description:
                err.response?.data?.message || err?.response?.data?.error || err?.message || '',
        });
    }
}

