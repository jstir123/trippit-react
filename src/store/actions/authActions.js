export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'LOGIN_SUCCESS'});
    }).catch((error) => {
      dispatch({
        type: 'LOGIN_ERROR',
        error
      });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'});
    }).catch((error) => {
      dispatch({type: 'SIGNOUT_ERROR'});
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
      return firestore.collection('users').doc(response.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        uid: response.user.uid
      })
    }).then(() => {
      dispatch({type: 'SIGNUP_SUCCESS'})
    }).catch((error) => {
      dispatch({type: 'SIGNUP_ERROR', error})
    })
  }
}

export const updateProfile = (uid, input) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    let updatedFields = {}

    if (input.firstName !== '') {
      updatedFields['firstName'] = input.firstName
    }

    if (input.lastName !== '') {
      updatedFields['lastName'] = input.lastName
    }

    if (input.bio !== '') {
      updatedFields['bio'] = input.bio
    }

    firestore.collection('users').doc(uid).update({
      ...updatedFields
    }).then(() => {
      dispatch({
        type: 'UPDATE_PROFILE',
        fields: updatedFields
      })
    }).catch((error) => {
      dispatch({
        type: 'UPDATE_PROFILE_ERROR',
        error: error
      })
    })
  }
}

export const clearBio = (uid) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).update({
      bio: ''
    }).then(() => {
      dispatch({
        type: 'CLEAR_BIO'
      })
    }).catch((error) => {
      dispatch({
        type: 'CLEAR_BIO_ERROR',
        error: error
      })
    })
  }
}

export const follow = (followerId, followedId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('followings').doc(`${followerId}${followedId}`).set({
      follower: followerId,
      followed: followedId
    })
    .then(() => {
      dispatch({
        type: 'ADD_FOLLOW'
      })
    })
    .catch((error) => {
      dispatch({
        type: 'ADD_FOLLOW_ERROR',
        error: error
      })
    })
  }
}

export const unFollow = (followerId, followedId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('followings').doc(`${followerId}${followedId}`).delete()
    .then(() => {
      dispatch({
        type: 'DELETE_FOLLOW'
      })
    })
    .catch((error) => {
      dispatch({
        type: 'DELETE_FOLLOW_ERROR',
        error: error
      })
    })
  }
}

export const updateProfilePic = (uid, url) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection('users').doc(uid).update({
      profilePicURL: url
    })
    .then(() => {
      dispatch({
        type: 'UPDATE_PROF_PIC'
      })
    })
    .catch((error) => {
      dispatch({
        type: 'UPDATE_PROF_PIC_ERROR',
        error: error
      })
    })
  }
}
