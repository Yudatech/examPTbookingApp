import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Calendar} from 'react-native-calendars';
import {inject, observer} from 'mobx-react';

@inject("userStore")
@observer export class CalendarCp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:{},
      items:{},
    };
    this.onDayPress = this.onDayPress.bind(this);
    this.markedDates={ 
      '2019-01-15': {  
        disabled: true
      },
      '2019-01-16': {  
        selected: true, marked: true, dotColor: 'green'
      },
      '2019-01-17': {  
        periods: [  
          { startingDay: false, endingDay: true, color: '#5f9ea0' },
          { startingDay: false, endingDay: true, color: '#ffa500' },
          { startingDay: true, endingDay: false, color: '#f0e68c' },
        ]
      },
      '2019-01-18': {  
        periods: [  
          { startingDay: true, endingDay: true, color: '#ffa500' },
          { color: 'transparent' },
          { startingDay: false, endingDay: false, color: '#f0e68c' },
        ]
      }
    
    }
        
    
  }

  setToday(){
    let d = new Date();
  }

  render() {
    return <Calendar
    style={styles.calendar}
    onDayPress={this.onDayPress}
    onDayLongPress={this.onDayLongPress}
    hideExtraDays
    current={()=>this.setToday()}
    minDate={'2018-03-01'}
    markingType={'custom'}
    markedDates={this.markedDates}
    hideArrows={false}
  />;

  }

  onDayPress(day) {
    this.props.userStore.setSelectedDate(day.dateString);
    let selectedDate= this.props.userStore.selectedDate;
    console.log("onDayPress",selectedDate);
    let markSelected={selectedDate: {selected: true, marked: true, dotColor: 'yellow'}};
    let marked= this.state.markedDates;
    marked.push(markSelected);
    this.setState({
      selected: day.dateString, 
      markedDates: marked
    });
  }


}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});