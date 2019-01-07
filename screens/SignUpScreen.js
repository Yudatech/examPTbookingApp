import React,  { Component } from 'react';

import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import { Button, Input, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignUpScreen extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      checked: false,
    }
  }

  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
      <Image source ={require('../assets/images/login-background.jpg')} style={styles.backgroundImage}/>
      <View style={styles.forms}>
      <Text style={styles.header1}>Sign Up</Text>
      <Input containerStyle={styles.inputs} inputStyle={{color:"white"}} placeholder='Email Address' placeholderTextColor='#eee' leftIcon={<Icon
      name='envelope'
      size={24}
      color='white'
    />}></Input>
      <Input containerStyle={styles.inputs} inputStyle={{color:"white"}} placeholder='User Name' placeholderTextColor='#eee' leftIcon={<Icon
      name='user'
      size={24}
      color='white'
    />}></Input>
    <Input containerStyle={styles.inputs} secureTextEntry={true} inputStyle={{color:"white"}} placeholder='Password' placeholderTextColor='#eee' leftIcon={<Icon
      name='lock'
      size={24}
      color='white'
    />}></Input>
    <Input containerStyle={styles.inputs} secureTextEntry={true} inputStyle={{color:"white"}} placeholder='Repeat Password' placeholderTextColor='#eee' leftIcon={<Icon
      name='lock'
      size={24}
      color='white'
    />}></Input>

      <CheckBox containerStyle={styles.checkbox}
      textStyle={styles.checkboxText}
      size ={12}
      checked={this.state.checked}
      onPress={()=>this.setState({checked: !this.state.checked})}
      />
       <Text style={
         {
           marginLeft: 45,
           color:'white',
           marginTop: -30,
           marginBottom: 20,
           marginRight: 25,
         }
       }>
       <Text>I have read and agree to the </Text>
      <Text style={
         { 
           color:'#AAA',
           textDecorationLine:'underline',
         }
       }
       onPress={()=>console.log('terms')}
       >Terms of Use</Text>
       <Text> and </Text>
       <Text style={
         { 
           color:'#AAA',
           textDecorationLine:'underline',
         }
       }
       onPress={()=>console.log('privacy')}
       >Privacy Policy</Text>
      </Text>
      

    
    
      <Button large containerStyle={{marginTop:0}} buttonStyle = {styles.login} icon={{name: 'envira', type: 'font-awesome', color:'white'}} titleStyle={{color: '#fff', fontWeight: 'bold',}} title='Sign Up'/>
      <Text style={
         {
           marginLeft: 20,
           color:'white',
           marginTop: 10,
         }
       }>
       <Text>Already got an account? </Text>
      <Text style={
         { 
           color:'#f4b831',
           textDecorationLine:'underline',
           marginTop:10
         }
       }
       onPress={()=>navigate('Auth')}
       >Login here</Text>
      </Text>
      </View>
      
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#a8aaad',
    color: '#eee',
  },
  backgroundImage:{
    flex:1,
    resizeMode: 'cover',
    position: 'absolute',
    width:'100%',
    height:'100%',
    justifyContent:'center',
  },
  forms:{
    justifyContent: 'center',
    color:'#eee',
    width:'70%',
    height: '70%',
    top:'10%',
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    marginLeft :'15%',
  },
  header1:{
    color: '#eee',
    fontSize: 30,
    marginBottom: 20,
    textAlign:'center',
    fontWeight: 'bold',
  },
  inputs:{
    padding: '5%',
    width: '90%',
  },
  checkbox:{
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    marginTop:0,  
  },
  checkboxText:{
    color: "#eee",
    fontSize: 12,
  },
  login:{
    backgroundColor:'#469716',
    width: '90%',
    marginLeft:'5%',
    marginTop:0,
  },
  facebook:{
    backgroundColor:'#3b5998',
    width: '90%',
    marginLeft:'5%',
    marginTop:0,
  },
  google:{
    backgroundColor: '#DA4735',
    width: '90%',
    marginLeft:'5%',
    marginTop:0,
  },
  twitter:{
    backgroundColor: '#28A9E0',
    width: '90%',
    marginLeft:'5%',
    marginTop:0,
  }
})
