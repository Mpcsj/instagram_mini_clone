const functions = require('firebase-functions');
const cors = require('cors')({origin:true})
const fs = require('fs')
const uuid = require('uuid-v4')
const {Storage} = require('@google-cloud/storage')
const storage = new Storage({
    projectId:'projetolambe',
    keyFilename:'projetolambe-firebase-adminsdk-xdc9i-2c76b2a6ea.json'
})
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.uploadImage = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
    console.log('funcao upload firebase, request::',request)
    cors(request,response,()=>{
        try {
            let nomeImg = '/tmp/imageToSave.jpg'
            console.log('write file sync')
            fs.writeFileSync(nomeImg,request.body.image,'base64')
            const bucket = storage.bucket('projetolambe.appspot.com')
            const id = uuid()
            console.log('bucket upload')
            bucket.upload(nomeImg,{
                uploadType:'media',
                destination:`/posts/${id}.jpg`,
                metadata:{
                    metadata:{
                        contentType:'image/jpeg',
                        firebaseStorageDownloadTokens:id
                    }
                }       
            },(err,file)=>{
                console.log('callback de bucket upload')
                if(err){
                    console.log('deu pau')
                    console.error(err)
                    return response.status(500).json({error:err})
                }else{
                    console.log('deu bom')
                    const fileName = encodeURIComponent(file.name)
                    const imageUrl ='https://firebasestorage.googleapis.com/v0/b/'
                    + bucket.name + '/o/' + fileName + '?alt=media&token='+id
                    return response.status(201).json({imageUrl:imageUrl})
                }

            })
        } catch (error) {
            console.error(err)
            response.status(500).json({error:error})
        }
    })
});
