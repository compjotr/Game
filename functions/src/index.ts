import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp(functions.config().firebase)

exports.newSubscriberNotification = functions.firestore
.document('subscriber/{subscriptionId}')
.onCreate(async event => {
    const data = event.data.data();
    const userId = data.userId
    const subscriber = data.subscriberId

    //notification content
    const paylod = {
        notification: {
            title: 'new Subscriber',
            body: '${subscriber} is following your content',
            icon: 'https://goo.glo/Fz9nrQ'
        }
    }
    const db = admin.firestore()
    const deviceRef = db.collection('devices').where('userId', '==', userId)
    // get users tokens and send notifications
    const devices = await deviceRef.get()
     const tokens = []

     //loop over documents
     devices.forEach(result => {
         const token = result.data().token;

         tokens.push(token)
     })
     return admin.messaging().sendToDevice(tokens, paylod)
})




