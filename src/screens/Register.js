import React,{Component} from 'react'
import{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import strRegister from '../strings/strRegister'
import {connect} from 'react-redux'
import {createUser} from '../store/actions/user'
import { dispatch } from 'rxjs/internal/observable/pairs'
class Register extends Component{
    state={
        name:'',
        email:'',
        password:''
    }

    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder={strRegister.hints.name}
                    style={styles.input} autoFocus={true}
                    value={this.state.name}
                    onChangeText={name=>this.setState({name})}/>
                <TextInput placeholder={strRegister.hints.email}
                    style={styles.input} value={this.state.email} 
                    keyboardType='email-address'
                    onChangeText={email=>this.setState({email})}/>
                <TextInput placeholder={strRegister.hints.password}
                    style={styles.input}
                    value={this.state.password} secureTextEntry={true}
                    onChangeText={password=>this.setState({password})}/>
                <TouchableOpacity 
                    onPress={()=>{this.props.onCreateUser(this.state)}}
                    style={styles.button}>
                    <Text style={styles.buttonText}>{strRegister.save}</Text>
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
    input:{
        marginTop:30,
        padding:10,
        backgroundColor:'#4286f4'
    },
    buttonText:{
        fontSize:20,
        color:'white',
    },
    input:{
        marginTop:20,
        width:'90%',
        backgroundColor:'#eee',
        height:40,
        borderWidth:1,
        borderColor:'#333',
        paddingLeft:15
    }
})

const mapDispatchToProps=dispatch=>{
    return{
        onCreateUser: user=>dispatch(createUser(user))
    }
}
export default connect(null,mapDispatchToProps)(Register)
// export default Register