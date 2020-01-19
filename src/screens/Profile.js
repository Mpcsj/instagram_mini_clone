import React,{Component} from 'react'
import {connect} from 'react-redux'
import {logout} from '../store/actions/user'
import{
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import {Gravatar} from 'react-native-gravatar'

class Profile extends Component{
    logout=()=>{
        console.log('navega p auth')

        this.props.navigation.navigate('Auth')
    }
    render(){
        const options={email:this.props.email, secure:true}
        console.log('funcao render de profile, email: ',this.props.email)
        return(
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar}/>
                <Text style={styles.nickname}>{this.props.name}</Text>
                <Text style={styles.email}>{this.props.email}</Text>
                <TouchableOpacity onPress={this.logout} style={styles.button}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const size = 150
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        paddingTop:30
    },
    avatar:{
        width:size,
        height:size
    },
    button:{
        marginTop:30,
        padding:10,
        backgroundColor:'#4286f4'
    },
    buttonText:{
        fontSize:20,
        color:'#fff'
    },
    nickname:{
        marginTop:30,
        fontSize:30,
        fontWeight:'bold'
    },
    email:{
        marginTop:20,
        fontSize:25
    }
})
const mapStateToProps = ({user})=>{
    return{
        email:user.email,
        name:user.name
    }
}
const mapDispatchToProps =dispatch=>{
    return{
        onLogout: ()=> dispatch(logout())
    }
}
// export default Profile
export default connect(mapStateToProps,mapDispatchToProps)(Profile)