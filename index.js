/** @format */

import React from 'react'
import {Provider} from 'react-redux'
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MenuNavigator from './src/navigators/MenuNavigator'
import storeConfig from './src/store/storeConfig'
import axios from 'axios'
axios.defaults.baseURL = 'https://projetolambe.firebaseio.com/'

const store = storeConfig()
const Redux = ()=>{
    return(
        <Provider store={store}>
            <MenuNavigator/>
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => Redux);
