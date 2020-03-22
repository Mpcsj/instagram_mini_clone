import React from 'react'
import {
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import Feed from '../screens/Feed'
import Register from '../screens/Register'
import Profile from '../screens/Profile'
import AddPhoto from '../screens/AddPhoto'
import Login from '../screens/Login'
import Splash from '../screens/Splash'
//
// import configFirebase from '../utils/config/configFirebase'
const iconSize = 30

const authRouter = createStackNavigator({
    Login:{screen:Login,navigationOptions:{title:'Login'}},
    Register:{screen:Register,navigationOptions:{title:'Register'}}
},{
    initialRouteName:'Login'
}
)
const loginOrProfileRouter = createSwitchNavigator({
    Profile:Profile,
    Auth:authRouter
},{
    initialRouteName:'Profile'   
})
const MenuRoutes ={
    Feed:{
        name:'Feed',
        screen:Feed,
        navigationOptions:{
            title:'Feed',
            tabBarIcon:({tintColor})=>
                <Icon name='home' size={iconSize}
                    color = {tintColor}/>
            
        }
    },
    Add:{
        name:'AddPhoto',
        screen: AddPhoto,
        navigationOptions:{
            title:'Add Picture',
            tabBarIcon:({tintColor})=>
                <Icon name='plus-square' size={iconSize-2}
                    color = {tintColor}/>
            
        }
    },
    Profile:{
        name:'Profile',
        screen: loginOrProfileRouter,
        navigationOptions:{
            title:'Profile',
            tabBarIcon:({tintColor})=>// caso eu queira mudar o nome do atributo tintColor
                <Icon name='user' size={iconSize}
                    color = {tintColor}/>
            
        }
    }
}
const MenuConfig={
    initialRouteName:'Feed',
    tabBarOptions:{
        showLabel:false,
        showIcon:true,
        activeTintColor:'black'
    }
}

const MenuNavigator =createBottomTabNavigator(MenuRoutes,MenuConfig)

// export default MenuNavigator
const stackRouter = createSwitchNavigator({
    Splash:Splash,
    App:MenuNavigator
},{
    initialRouteName:'Splash'
})
export default  stackRouter