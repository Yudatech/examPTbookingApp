import React, {Component} from 'react';
import {data, firebase} from '../firebase/firebase';

import {StyleSheet, Image, View, Text} from 'react-native';

import {Button, Input, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import {inject, observer} from 'mobx-react';

@inject("userStore")
@observer export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "123@abc.com",
      password: "123456",
      checked: false
    }
  }
  

  checkLogin() {
    const {email, password} = this.state;
    if(email && password){

      // let spotSnapshots = await data.collection('spots').where("type", "==", type).orderBy("created", "desc").get();
      // return spotSnapshots.docs;

      firebase
      .auth()
      .signInWithEmailAndPassword(email, password).then(()=>{
       let u = firebase.auth().currentUser;
       let uid = u.uid;
       data.collection('users').where("email", "==", email).get().then((snapshots)=>{
          let loginUser = snapshots.docs[0].data();
          loginUser.id= uid;
          this.props.userStore.setLoginUser(loginUser);

          let ref = data.collection('users').doc(loginUser.id);

          if(this.props.userStore.loginUser.role === "PT"){
            data.collection('sessions').where("inviter", "==", ref).get().then((sessions)=>{
              //console.log(session.docs[0].data());

              this.props.userStore.setAgenda(sessions);
              this.props.navigation.navigate('Main');
            });
          }else{
            data.collection('sessions').where("invitee", "==", ref).get().then((sessions)=>{
              //console.log(session.docs[0].data());
              this.props.userStore.setAgenda(sessions);
              this.props.navigation.navigate('Main');
            });
          }
          
        });
       
        
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
          return;
        } else {
          alert( errorMessage);
          return;
        }
        
      });
    }
    
    
    
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source
          ={require('../assets/images/login-background.jpg')}
          style={styles.backgroundImage}/>
        <View style={styles.forms}>
          <Text style={styles.header1}>Login</Text>
          <Input
            containerStyle={styles.inputs}
            inputStyle={{
            color: "white"
          }}
            placeholder='User Name'
            placeholderTextColor='#eee'
            leftIcon={< Icon name = 'user' size = {
            24
          }
          color = 'white' />}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}/>
          <Input
            secureTextEntry={true}
            containerStyle={styles.inputs}
            inputStyle={{
            color: "white"
          }}
            placeholder='Password'
            placeholderTextColor='#eee'
            leftIcon={< Icon name = 'lock' size = {
            24
          }
          color = 'white' 
           />}
           onChangeText = {
            (password) => this.setState({password})}
            value={this.state.password}
          />

          {/* <CheckBox containerStyle={styles.checkbox}
      size={12}
      textStyle={styles.checkboxText}
      title='Remember me'
      checked={this.state.checked}
      onPress={()=>this.setState({checked: !this.state.checked})}
      /> */}

          <Button
            large
            containerStyle={{
            marginTop: 0
          }}
            buttonStyle={styles.login}
            icon={{
            name: 'envira',
            type: 'font-awesome',
            color: 'white'
          }}
            titleStyle={{
            color: '#fff',
            fontWeight: 'bold'
          }}
            title='Login'
            onPress={() => this.checkLogin()}/>
          <Text
            style={{
            marginTop: 15,
            textAlign: 'center',
            color: '#eee',
            fontSize: 20
          }}>or</Text>
          <Button
            large
            containerStyle={{
            marginTop: 20
          }}
            buttonStyle={styles.facebook}
            icon={{
            name: 'facebook-f',
            type: 'font-awesome',
            color: 'white'
          }}
            title='Facebook'
            titleStyle={{
            color: '#fff',
            fontWeight: 'bold'
          }}/>
          <Button
            large
            containerStyle={{
            marginTop: 20
          }}
            buttonStyle={styles.twitter}
            icon={{
            name: 'twitter',
            type: 'font-awesome',
            color: 'white'
          }}
            title='Twitter'
            titleStyle={{
            color: '#fff',
            fontWeight: 'bold'
          }}/>
          <Button
            large
            containerStyle={{
            marginTop: 20
          }}
            buttonStyle={styles.google}
            icon={{
            name: 'google-plus',
            type: 'font-awesome',
            color: 'white'
          }}
            title='Google'
            titleStyle={{
            color: '#fff',
            fontWeight: 'bold'
          }}/>
          <Text
            style={{
            marginLeft: 18,
            color: '#f4b831',
            marginTop: 8,
            textDecorationLine: 'underline'
          }}
            onPress={() => navigate('SignUp')}>Sign up</Text>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8aaad',
    color: '#eee'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  forms: {
    justifyContent: 'center',
    color: '#eee',
    width: '70%',
    height: '70%',
    top: '10%',
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    marginLeft: '15%'
  },
  header1: {
    color: '#eee',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  inputs: {
    padding: '5%',
    width: '90%'
  },
  checkbox: {
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    marginTop: 0
  },
  checkboxText: {
    color: "#eee",
    fontSize: 12
  },
  login: {
    backgroundColor: '#f4b831',
    width: '90%',
    marginLeft: '5%',
    marginTop: 0
  },
  facebook: {
    backgroundColor: '#3b5998',
    width: '90%',
    marginLeft: '5%',
    marginTop: 0
  },
  google: {
    backgroundColor: '#DA4735',
    width: '90%',
    marginLeft: '5%',
    marginTop: 0
  },
  twitter: {
    backgroundColor: '#28A9E0',
    width: '90%',
    marginLeft: '5%',
    marginTop: 0
  }
})
