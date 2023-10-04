/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import MultiStepForm from './src/navigation/screens/MultiStepForm';
import Tabs from './src/navigation/Tabs';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';



AppRegistry.registerComponent(appName, () => index);

const index =()=>{
    
    return(
        
        <Tabs />
        
    )
}

export default index;