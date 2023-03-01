/*
 * @Author: delta 528491526@qq.com
 * @Date: 2023-02-17 17:12:09
 * @LastEditors: delta 528491526@qq.com
 * @LastEditTime: 2023-02-17 21:14:26
 * @FilePath: \my-project\src\app\route-config.ts
 * @Description: 
 * 
 */
interface RouteConfig {
    link:string
    text:string
    icon?:string
    children?:[]
}
// interface SubRouteConfig {
//     link:string
//     text:string
//     children:Array<SubRouteConfig | RouteConfig>
// }


export const routeConfig:RouteConfig[] = [
    {
        link:'welcome',
        text:'welcome',
    },
    {
        link:'monitor',
        text:'monitor',
    },
    {
        link:'workplace',
        text:'workplace',
    },
    {
        link:'article',
        text:'article',
    },
    {
        link:'basicForm',
        text:'basicForm',
    },

]