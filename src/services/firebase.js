import firebase from 'firebase/app';
import firestore from 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/auth'

const environment = require('../../environments.js')

if (!firebase.apps.length) {
  firebase.initializeApp(environment.config.firebase);
  //firebase.firestore().settings(Object.assign({}));
} else {
  firebase.app().firestore()
}

//firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const storage = firebase.storage()
export const auth = firebase.auth()
export const functions = firebase.functions();
export { firebase }



export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const FacebookProvider = new firebase.auth.FacebookAuthProvider()
export const TwitterProvider = new firebase.auth.TwitterAuthProvider()

// Look into Active Directory Signup
//export const MicrosoftProvider = new firebase.auth.MicrosoftAuthProvider()

// onAuthStateChanged listener
export const getUserStatus = function ({ commit, dispatch }) {
  return new Promise(function (resolve, reject) {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
      return auth.onAuthStateChanged(function(user) {
        //console.log("!!!!!!", user)
        if (user) {
          setUserOnlineStatus(user)
          commit('users/SET_USER', user)
          dispatch('users/profile', { uid: user.uid }).then((profile)=>{
            commit('users/SET_PROFILE', profile)
          })
          resolve(user);
        } else {
          commit('users/SET_USER', false)
          commit('users/SET_PROFILE', false)
          dispatch('users/logout')
          reject();
        }
      });
    })
  });
};

// User presence management
function setUserOnlineStatus(user) {

  if (!firebase.auth().currentUser) return;

  /*
  var profiles = firebase.firestore().collection('profiles')


  profiles.child(user.uid).child(`last_online`).onDisconnect().set(firebase.database.ServerValue.TIMESTAMP)
    .catch(function (error) {
      console.log('Error while setting last_online in fireinit', error);
    });
  firebase.firestore().ref('/.info/connected').on('value', function(snapshot) {
    console.log("CONNECTED", user, snapshot.val(), firebase.database.ServerValue.TIMESTAMP)
    if (snapshot.val()) {
      profiles.child(user.uid).child(`online`).onDisconnect().set(false)
        .catch(function(error) {
          console.log('Erorr while setting offline', error);
        });
      profiles.child(user.uid).child(`online`).set(true)
        .catch(function(error) {
          console.log('Erorr while setting online', error);
        });
    }
  });
  */
}

export const firebase_op_actions = function (object) {
  return {
    toggle(value) {
      var index = this.selected.indexOf(value);
      if (index ==-1) {
        this.selected.push(value)
      } else {
        this.selected.splice(index, 1);
      }
    },
    selectall() {
      if (this.selected.length) {
        this.selected = []
      } else {
        this.selected = _.map(object, (o)=> { return o.id  })
      }
    }
  }
}

export const firebase_mutations = function () {
  return {
    POPULATE(state, values) {
      state.list = values
    },
    CREATE(state, values) {
      state.list.push(values)
    },
    UPDATE(state, { id, values }) {
      var index = _.findIndex(state.list, { id });
      state.list[index] = _.merge(state.list[index], values)
    },
    REMOVE(state, { id }) {
      state.list = _.filter(state.list, (o) => { return o.id!=id })
    }
  }
}

export const firebase_actions = function (ref) {
  return {
    get({ commit, dispatch }, { id }) {
      return new Promise((resolve, reject) => {
        ref.doc(id).get().then(snapshot => {
          var data = Object.assign(snapshot.data(), { id: snapshot.id })
          resolve(data)
        }).catch((error)=>{
          reject()
        })
      })
    },
    init({ commit, dispatch }, state) {
      return new Promise((resolve, reject) => {
        ref.onSnapshot(querySnapshot => {
          querySnapshot.docChanges().forEach(change => {
            console.log(change)

            
            if (change.type === 'added') {
              console.log('New city: ', change.doc.data());
            }
            if (change.type === 'modified') {
              console.log('Modified city: ', change.doc.data());
            }
            if (change.type === 'removed') {
              console.log('Removed city: ', change.doc.data());
            }

          });
        });

        ref.get().then(snapshot => {
          //console.log("SNAPSHOT!", snapshot)
          if (!snapshot.empty) {
            let data = _.map(snapshot.docs, (doc) => { 
              return Object.assign(doc.data(), { id: doc.id }) 
            })
            commit('POPULATE', data);
            resolve(data)
          }
        }).catch((error)=>{
          ref.where("permissions.any", "array-contains", auth.currentUser.uid).get().then(snapshot => {
            if (!snapshot.empty) {
              let data = _.map(snapshot.docs, (doc) => { 
                return Object.assign(doc.data(), { id: doc.id }) 
              })
              commit('POPULATE', data);
              resolve(data)
            } else {
              commit('POPULATE', []);
            }
          }).catch((error)=>{
            reject()
          })
        })


      })
    },
    create({ commit, dispatch }, { values }) {
      return new Promise((resolve, reject) => {
         values = {
          ...values,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: auth.currentUser.uid,
          updated: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: auth.currentUser.uid
        }

        console.log("CREATING", values)
        ref.add(unsetempty(values)).then((response)=> {
          //console.log("Creating", values, response)
          var object = Object.assign(values, { id: response.id });

          console.log("CREATING", object)

          commit('CREATE', object)
          resolve(object)
          //setTimeout(()=>{
           // dispatch('init').then(()=>{
              
           // })
          //}, 500)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    update({ commit, dispatch }, { id, values }) {
      return new Promise((resolve, reject) => {
        console.log("Updating", id, values)
        values = {
          ...values,
          updated: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: auth.currentUser.uid,
        }
        ref.doc(id).set(values, { merge: true }).then((response) => {
          commit('UPDATE', { id, values })
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    delete({ commit, dispatch }, { id }) {
      return new Promise((resolve, reject) => {
        ref.doc(id).delete().then((response) => {
          commit('REMOVE', { id })
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    collection: ({ commit, dispatch }, { collection, id }) => {
      return {
        all: function () {
          return new Promise((resolve, reject) => {
            ref.doc(id).collection(collection).get().then((snapshot)=> {
              //console.log("COLLECTION SNAP", snapshot.empty)
              resolve(
                _.map(snapshot.docs, (doc) => { return Object.assign(doc.data(), { id: doc.id }) })
              )
            })
          })
        },
        get: function (sid) {
          return new Promise((resolve, reject) => {
            ref.doc(id).collection(collection).doc(sid).get().then((snapshot)=> {
              resolve(
                Object.assign(snapshot.data(), { id: snapshot.id }) 
              )
            })
          })
        },
        update: function (sid, values) {
          return new Promise((resolve, reject) => {
            ref.doc(id).collection(collection).doc(sid).set(values, { merge: true}).then((result)=>{
              resolve(result)
            })
          })
        },
        create: function(values) {
          return new Promise((resolve, reject) => {
            ref.doc(id).collection(collection).add(values).then((result)=>{
              resolve(result)
            })
          })
        }
      }
    }
  }
}

function unsetempty(j) {
    for (var i in j){
        if (typeof j[i] === "object") {
            unsetempty(j[i]);
        }
        if (j[i] === null) {
            unset(j[i]);
        }
    }
    return j
}