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

    componentDidUpdate = prevProps =>{
        if(prevProps.loading && !this.props.loading){
            this.setState({
                image:null,
                comment:''
            })
            this.props.navigation.navigate('Feed')
        }
    }
    pickImage=()=>{
        if(!this.props.name ){
            Alert.alert('Falha',noUser)
            return 
        }
        ImagePicker.showImagePicker({
            title:strAddPhoto.chooseImg,
            quality:1
        },res=>{
            if(!res.didCancel){
                this.setState({image:{uri:res.uri,base64:res.data}})
            }
        }
        )
    }
    createFormData = (photo, body) => {
        const data = new FormData();
      
        data.append("file", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
      
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
        console.log('data::',data)
        return data;
      };
      
    save = async ()=>{
        console.log('funcao salva img')
        if(!this.props.name ){
            Alert.alert('Falha',noUser)
            return 
        } 
        await this.props.onAddPost({
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

        // this.setState({image:null,comment:''}) // limpando a imagem atual na tela
        // this.props.navigation.navigate('Feed') // navego automaticamente para feed
        // console.log('indo chamar o server...')
        // fetch("http://c7bf99e6.ngrok.io/UPLOAD/", {
        //     method: "POST",
        //     headers:{
        //         'Authorization':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IlRlc3RlQHRlc3RlLmNvbSIsImV4cCI6MTU4Njk5OTgzNH0.27xel4oqu4oT7HZkW8C3TQUgw8IggEoDO7IORdpdkK4'
        //     },
        //     body: this.createFormData(this.state.photo, {})
        // })
        // .then(response => response.json())
        // .then(response => {     
        //     console.log("upload success", response);
        //     alert("Upload success!");
        //     console.log(response)
        //     // this.setState({ photo: null });
        // })
        // .catch(error => {
        //     console.log("upload error", error);
        //     alert("Upload failed!");
        // });

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
                    <TouchableOpacity 
                        onPress={this.save}
                        style={styles.buttom}
                        disabled={this.props.loading}
                        >
                        <Text style={[styles.buttomText,this.props.loading?styles.buttomDisabled:null]}>
                            {strAddPhoto.save}
                        </Text>
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
    },
    buttomDisabled:{
        backgroundColor:'#AAA'
    }
})

// export default AddPhoto

const mapStateToProps= ({user,posts})=>{
    // pega informacoes do redux e joga pra esse componente
    return{
        email:user.email,
        name:user.name,
        loading:posts.isUploading
    }
}

const mapDispatchToProps = dispatch=>{
    // joga informacoes desse componente para o redux
    return {
        onAddPost: post=>dispatch(addPost(post))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPhoto)