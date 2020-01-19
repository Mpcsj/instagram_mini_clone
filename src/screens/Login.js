import React,{Component} from 'react'
import {connect} from 'react-redux'
import {login} from '../store/actions/user'
import{
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native'
import strLogin from '../strings/strLogin'

class Login extends Component{
    state={
        name:'temporario',
        email:'',
        password:''
    }
    login=()=>{
        this.props.onLogin({...this.state})
        this.props.navigation.navigate('Profile')
    }
    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder='email' style={styles.input}
                    autoFocus={true} keyboardType='email-address'
                        value={this.state.email}
                        onChangeText={email=>this.setState({email})}/>
                
                <TextInput placeholder='senha' style={styles.input}
                    autoFocus={true} keyboardType='email-address'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={password=>this.setState({password})}/>
                <TouchableOpacity onPress={this.login} style={styles.button}>
                    <Text style={styles.buttonText}>{strLogin.login}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate('Register')
                }} style={styles.button}>
                    <Text style={styles.buttonText}>{strLogin.register}</Text>
                </TouchableOpacity>
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
    buttonText:{
        fontSize:20,
        color:'white'
    },
    button:{
        marginTop:30,
        padding:10,
        backgroundColor:'#4286f4'
    },
    input:{
        marginTop:20,
        width:'90%',
        backgroundColor:'#eee',
        height:40,
        borderWidth:1,
        borderColor:'#333'
    }
})

const mapDispatchToProps = dispatch =>{
    return{
        onLogin:user =>dispatch(login(user))// pega a action criada e encaminha p todos os reducers
    }
}
// export default Login
export default connect(null,mapDispatchToProps)(Login)// o primeiro parametro seria quando quero mapear alguma
// propriedade global de estado para os reducers