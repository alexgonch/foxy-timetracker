// class Firebase {
//     constructor() {
//         app.initializeApp(config);
// 
//         this.emailAuthProvider = app.auth.EmailAuthProvider;
// 
//         this.auth = app.auth();
//         this.db = app.firestore();
//     }
// 
//     // AUTH
// 
//     doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
// 
//     doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
// 
//     doSignOut = () => this.auth.signOut();
// 
//     doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
// 
//     // USER
// 
//     doReauthenticateWithCredential = credential => this.auth.currentUser.reauthenticateWithCredential(credential);
// 
//     doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
// 
//     // MISC
// 
//     generateCredential = password => this.emailAuthProvider.credential(this.auth.currentUser.email, password);
// }
// 
// export default Firebase;
