import React,{Component} from 'react'
import {connect} from 'react-redux'
import {ADD_POST, addPost} from '../store/actions/posts'
import{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import strAddPhoto  from '../strings/str-AddPhoto'

const noUser = 'Voce precisa estar logado para adicionar imagens'
class AddPhoto extends Component{
    state={
        image:null,
        comment:''
    }
    pickImage=()=>{
        // if(!this.props.name ){
        //     Alert.alert('Falha',noUser)
        //     return 
        // }
        ImagePicker.showImagePicker({
            title:strAddPhoto.chooseImg,
            maxHeight:600,
            maxWidth:1800,
            quality:1
        },res=>{
            if(!res.didCancel){
                this.setState({image:{uri:res.uri,base64:res.data}})
            }
        }
        )
    }
    save = async ()=>{
        console.log('funcao salva img')
        if(!this.props.name ){
            Alert.alert('Falha',noUser)
            return 
        } 
        this.props.onAddPost({
            // envia p Redux
            id:Math.random(),
            nickname:this.props.name,
            email:this.props.email,
            image:this.state.image,
            comments:[{
                nickname:this.props.name,
                comment: this.state.comment
            }]
        })

        this.setState({image:null,comment:''}) // limpando a imagem atual na tela
        this.props.navigation.navigate('Feed') // navego automaticamente para feed
    }
    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>{strAddPhoto.shareImg}</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image}/>
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.buttom}>
                        <Text style={styles.buttomText}>{strAddPhoto.choosePic}</Text>
                    </TouchableOpacity>
                    <TextInput placeholder={strAddPhoto.commentHint}
                        style={styles.input}
                        editable={this.props.name !=null}
                        value={this.state.comment}
                        onChangeText={comment=>this.setState({comment})}
                    />
                    <TouchableOpacity onPress={this.save} style={styles.buttom}>
                        <Text style={styles.buttomText}>{strAddPhoto.save}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginTop:Platform.OS==='ios'?30:10,
        fontWeight:'bold'
    },
    imageContainer:{
        width:'90%',
        height:Dimensions.get('window').width/2,
        backgroundColor:'#eee',
        marginTop:10
    },
    image:{
        width:'100%',
        height:Dimensions.get('window').width/2,
        resizeMode:'center'
    },
    buttom:{
        marginTop:30,
        padding:10,
        backgroundColor:'#4286f4'
    },
    buttomText:{
        fontSize:20,
        color:'#fff'
    },
    input:{
        marginTop:20,
        width:'90%'
    }
})

// export default AddPhoto

const mapStateToProps= ({user})=>{
    // pega informacoes do redux e joga pra esse componente
    return{
        email:user.email,
        name:user.name
    }
}

const mapDispatchToProps = dispatch=>{
    // joga informacoes desse componente para o redux
    return {
        onAddPost: post=>dispatch(addPost(post))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPhoto)