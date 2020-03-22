import React from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text
} from 'react-native'
import {TIME_SPLASH_MS} from '../utils/UtilConstants'
export default class SplashScreen extends React.Component{
    componentDidMount=()=>{
        setTimeout(()=>{
            this.props.navigation.navigate('App')
        },TIME_SPLASH_MS)
    }
    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../../assets/imgs/icon.png')}
                    style={styles.image}/>
                <Text style={styles.title}>Instagram clone...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height:200,
        width:200,
        resizeMode:'contain'
    },
    title:{
        fontSize:50,
        fontWeight:'bold',
        textAlign:'center'
    }
})