import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Button, Input, withTheme} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import Autocomplete from 'react-native-autocomplete-input';
import {inject, observer} from 'mobx-react';
import {data, firebase} from '../firebase/firebase';


const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginTop:-30,
    flex: 1,
    backgroundColor: '#a8aaad',
    color: '#eee',
    height:750,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  header2:{
    color:"#eee",
    marginTop:10,
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  forms: {
    justifyContent: 'center',
    color: '#eee',
    width: '70%',
    height: '70%',
    top: '10%',
    backgroundColor: 'rgba(200, 200, 200, 0.3)',
    marginLeft: '15%'
  },
  inputs: {
    marginLeft:15,
    padding: '5%',
    width: '90%',
  },
  instructions: {
    textAlign: 'left',
    paddingLeft:25,
    color: '#333333',
    color: "#eee",
    fontSize: 16,
    marginTop:20
  },
  datePicker:{
    width: 230,
    marginTop:5,
    marginLeft:25,
  },
  autocompleteContainer:{
    marginLeft:20,
    width:'85%',
  },
  autoCompletePlaceholder:{
    marginLeft:10
  },
  confirmBtn: {
    backgroundColor: '#f4b831',
    width: '90%',
    marginLeft: '5%',
    marginTop: 20
  },
  cancelBtn:{
    backgroundColor: '#aaa',
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: 20
  }
})

@inject("userStore")
@observer export class AddSession extends React.Component{
  constructor(props){
    super(props);
    this.state={
      startTime:'',
      finishTime:'',
      clients:[],
      query:'',
      invitee:'',
      events:'',
    };
  }

  componentDidMount() {
    data.collection('users').get().then((snapshots)=>{
      let userList = snapshots.docs;
      
      userList.map((user)=> {
        const n = user.data().username;
        const uid = user.ref.id;
        const currentId= this.props.userStore.loginUser.id;
       
        if(uid!== currentId && n){
          this.state.clients[n]=uid;
        }
       
      }
      )

      // const newClients = {};
      // Object
      //   .keys(this.state.clients)
      //   .forEach(key => {
      //     newClients[key] = this.state.clients[key];
      //   });
      // this.setState({
      //   clients: newClients
      // }, console.log("clients",this.setState.clients));   
    })
  }

  handleConfirm(){
    if(!this.state.startTime ){
      alert("Don't forget to set time!")
    }else{
      console.log(this.state)
      this.props.userStore.closeAddSessionModal();
    }
    
  }

 


  render(){
    return (
      <View style={styles.container}>
      <Image
          source
          ={require('../assets/images/action-activity-adult-207779.jpg')}
          style={styles.backgroundImage}/>
            <View style={styles.forms}> 
           <Text style={styles.header2}>Add Events</Text>

           {/* <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          placeholder= "Select a client"
          inputContainerStyle={styles.autoCompletePlaceholder}
          placeholderTextColor='#888'
          data = {this.state.clients}
          // //data={films.length === 1 && comp(query, films[0].title) ? [] : films}
          // defaultValue={query}
          // onChangeText={text => this.setState({ query: text })}
          // placeholder="Enter Star Wars film title"
          renderItem={({ name }) => (
            <TouchableOpacity onPress={() => this.setState({ query: name })}>
              <Text >
                {name}
              </Text>
            </TouchableOpacity>
         )}
        /> */}
          <Input className="client"
          containerStyle={styles.inputs}
          type="text"
          modifer="material"
          placeholder="Client Name"
          placeholderTextColor="#eee"
          inputStyle={{
            color: 'white'
          }}
          onChangeText={(name)=>this.setState({invitee: this.state.clients[name] })}
        />

        <Input className="events"
          containerStyle={styles.inputs}
          type="text"
          modifer="material"
          placeholder="Events"
          placeholderTextColor="#eee"
          inputStyle={{
            color: 'white'
          }}
          onChangeText={(events)=>this.setState({events})}
        />
       
        <Text 
          style={styles.instructions}
          size={24}
        >From:</Text>
        <DatePicker
          style={styles.datePicker}
          date={this.state.startTime ? this.state.startTime : this.state.datetime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          minuteInterval={5}
          minDate="2019-01-01 00:00"
          maxDate="2019-03-01 00:00"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={true}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36,
              color: "white"
            },
            dateText: {
              color: '#eee'
            },
            
          }}
          onDateChange={(datetime) => {this.setState({startTime: datetime});}}
        />
        <Text 
          style={styles.instructions}
          size={24}
        >To:</Text>
        <DatePicker
          style={styles.datePicker}
          date={this.state.finishTime ? this.state.finishTime : this.state.datetime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          minuteInterval={5}
          minDate="2019-01-01 00:00"
          maxDate="2019-03-01 00:00"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={true}
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            },
            dateText: {
              color: '#eee'
            },
            
          }}
          onDateChange={(datetime) => { this.setState({finishTime: datetime});}}
        />

        <Button
            large
            containerStyle={{
            marginTop: 0
          }}
            buttonStyle={styles.confirmBtn}
            
            titleStyle={{
            color: '#fff',
            fontWeight: 'bold'
          }}
            title='Confirm'
            onPress={()=>this.handleConfirm()}
        />

        <Button
            large
            containerStyle={{
            marginTop: 0
          }}
            buttonStyle={styles.cancelBtn}
            
            titleStyle={{
            color: '#fff',
            fontWeight: 'bold'
          }}
            title='Cancel'
            onPress={() => this.props.userStore.closeAddSessionModal()}
        />
           </View>
       
        
      </View>
      
    )
  }
}
