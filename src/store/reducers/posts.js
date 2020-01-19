import {ADD_POST,ADD_COMMENT} from '../actions/actionTypes'

function getRandomImage(idx){
    if(idx % 2 == 0){
        return require('../../../assets/imgs/fence.jpg')
    }else{
        return require('../../../assets/imgs/bw.jpg')
    }
}
 getPosts=()=>{
    let posts = []
    for(let i =0;i<50;i++){
        let atual={
            id:Math.random(),
            nickname:`User ${Math.random()*i}`,
            email:`user${Math.random()}@${Math.random()<0.5?"hotmail":"gmail"}.com`,
            image:getRandomImage(i)
        }
        let comments = []
        for(let j =Math.floor(Math.random() * 4);j>0;j--){
            let currentComment = {
                nickname:`Nickname: ${Math.random()}`,
                comment:`Comment ${Math.random()}`
            }
            comments.push(currentComment)
        }
        atual.comments = comments
        posts.push(atual)
    }
    return posts
}
const initialState ={
    posts:getPosts()
}
const reducer  =(state=initialState,action)=>{
    // if (!state){
    //     state = {
    //         posts:getPosts()
    //     }
    // }
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                posts:state.posts.concat({
                    ...action.payload
                })
            }

        case ADD_COMMENT:
            return{
                ...state,
                posts:state.posts.map(post=>{
                    if(post.id === action.payload.postId){
                        // se for o comentario procurado
                        if(post.comments){
                            post.comments = post.comments.concat(
                                action.payload.comment
                            )
                        }else{
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post
                })
            }
        default:
            return state
    }
}

export default reducer