import {
    SET_POSTS,
    ADD_COMMENT,
    CREATING_POST,
    POST_CREATED
} from './actionTypes'
import axios from 'axios'
export const addPost= post=>{
    console.log('funcao add post de redux')
    return dispatch =>{
        console.log('return dispatch')
        dispatch(creatingPost())
        axios({
            url:'uploadImage',
            baseURL:'https://us-central1-projetolambe.cloudfunctions.net',
            method:'post',
            data:{
                image:post.image.base64
            }
        }).catch(err =>console.log(err))
        .then(res =>{
            console.log('then de storage...=>',res)
            post.image = res.data.imageUrl
            axios.post('/posts.json',{...post})
            .catch(err => console.log(err))
            .then(res =>{
                dispatch(fetchPosts())
                dispatch(postCreated())
            })
        })
    }
}

export const addComment = payload =>{
    return dispatch=>{
        axios.get(`/posts/${payload.postId}.json`)
        .catch(err => console.error(err))
        .then(res =>{
            const comments = res.data.comments || []
            comments.push(payload.comment)
            axios.patch(`/posts/${payload.postId}.json`,{comments})
            .catch(err =>console.error(err))
            .then(res2=>{
                dispatch(fetchPosts())
            })
        })
    }
    // return{
    //     type:ADD_COMMENT,
    //     payload:payload
    // }
}

export const setPosts = posts =>{
    return{
        type:SET_POSTS,
        payload:posts
    }
}

export const fetchPosts = ()=>{
    return dispatch=>{
        axios.get('/posts.json')
        .catch(err =>console.error(err))
        .then(res =>{
            const rawPosts = res.data
            const posts = []
            for(let key in rawPosts){
                let atual={
                    ...rawPosts[key],
                    id:key
                }
                posts.push(atual)
                console.log('post atual:')
                console.log(atual)
            }
            dispatch(setPosts(posts.reverse()))
        })
    }
}

export const creatingPost = ()=>{
    return {
        type:CREATING_POST
    }
}

export const postCreated = ()=>{
    return {
        type:POST_CREATED
    }
}