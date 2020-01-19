import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Gravatar} from 'react-native-gravatar'
import{
    StyleSheet,
    Text,
    View,
    Platform,
    Image
} from 'react-native'
import icon from '../../assets/imgs/icon.png'

class Header extends Component{
    render(){
        const name = this.props.name || 'Anonymous'
        const gravatar = this.props.email?
        <Gravatar options={{email:this.props.email,secure:true}} style={styles.avatar}/>
            :null
        return(
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image}/>
                    <Text style={styles.title}>Instagram clone</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        )
    }
}
const imgSize =30
const styles = StyleSheet.create({
    container:{
        marginTop:Platform.OS === 'ios'?20:0,
        padding:10,
        borderBottomWidth:1,
        borderColor:'#BBB',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    image:{
        height:30,
        width:30,
        resizeMode:'contain'
    },
    title:{
        color:'black',
        fontFamily:'shelter',
        fontSize:28
    },
    avatar:{
       width:imgSize,
       height:imgSize,
       marginLeft:10,
       borderRadius:imgSize/2

    },
    userContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    user:{
        fontSize:10,
        color:'#888'
    }
})


const mapStateToProps = ({user})=>{
    return{
        email:user.email,
        name:user.name
    }
}

export default connect(mapStateToProps)(Header)