import * as firebaseService from "../services/firebase"

const setChildUser = (userId, conversationId) => {
    firebaseService.db.ref('banana-chats').child(`chats_${conversationId}`).set({
        conversations: {},
        //THIS IS USER MOCK WAIT FOR API 
        user: {
            displayName : "Nguyễn Văn A_"+userId,
            photoURL : "https://graph.facebook.com/2586359538318706/picture",
            uid : userId
        }
    })
}

export const writeMessage = async (userId, conversationId, content) => {
  try {
    await firebaseService.db.ref('banana-chats').child(`chats_${conversationId}`).child('user').once('value', function(snapshot) {
        snapshot.val() === null && setChildUser(userId, conversationId)
    })
    await firebaseService.db.ref('banana-chats').child(`chats_${conversationId}`).child('conversations').push({
        content,
        timestamp: Date.now(),
        author: userId || '1'
      })
    return {success: true, error: null}
  } catch (error) {
    return {success: false, error: error.message}
  }
}

export const readMessage = (conversationId,callback) => {
  if(firebaseService.db && firebaseService.db.ref(`banana-chats/chats_${conversationId}/conversations`) )
  {
    firebaseService.db.ref(`banana-chats`).child(`chats_${conversationId}`).child('conversations').on('value', snapshot => {
      snapshot.val() && callback(Object.values(snapshot.val()))
    })
  }
}