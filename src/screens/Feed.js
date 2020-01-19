import React,{Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet,FlatList,View} from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component{
    state={
        posts:getPosts()
    }

    render(){
        return(
            <View style={styles.container}>
                <Header/>
                <FlatList 
                    data={this.props.posts}
                    keyExtractor={item=>`${item.id}`}
                    renderItem={({item})=>
                            <Post key={item.id} {...item}/>
                        }// uso um destructuring
                    // para obter o item em renderItem pois possuo
                    // um objeto com mais informacoes e nesse caso,
                    // eu quero obtem apenas o item
                    />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5fcff'
    }
})

// export default Feed

const mapStateToProps = ({posts})=>{
    return{
        posts:posts.posts // loucura
    }
}

export default connect(mapStateToProps)(Feed)