import {Platform} from 'react-native'

export const port = ':8082';
export const baseURL = 'http://www.axhuahua.com';
export const webBaseURL = 'http://www.axhuahua.com';

const platform = "iosxx";

export const webHome = Platform.OS == platform?(webBaseURL+'/ios/home'): (webBaseURL+'/home');
export const webProduct = Platform.OS == platform?(webBaseURL+'/ios/product/all'):(webBaseURL+'/product/all');
export const webHelp =Platform.OS == platform? (webBaseURL+'/ios/help'):(webBaseURL+'/help');
export const webAbout =Platform.OS == platform?(webBaseURL+'/ios/about'):(webBaseURL+'/about') ;
export const webProtol = Platform.OS == platform?(webBaseURL+'/ios/protol'):(webBaseURL+'/protol');

export const getCheckImageCodeURL = baseURL+port+'/relieve-consume/user/createCheckImage';
export const sendCodeURL = baseURL+port+'/relieve-consume/user/sendMessage';
export const loginURL = baseURL+port+'/relieve-consume/user/login';
export const browseDataURL = baseURL+port+'/relieve-consume/loan-info/queryLoanScans';