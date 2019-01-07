import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import {Calendar, Agenda} from 'react-native-calendars';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        
        <Text style={styles.text}>Custom calendar with custom marking type</Text>
        <Calendar
          style={styles.calendar}
          onDayLongPress={this.onDayLongPress}
          hideExtraDays
          current={'2018-03-01'}
          minDate={'2018-03-01'}
          markingType={'custom'}
          markedDates={{
            '2018-03-01': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2
                },
                text: {
                  color: 'blue',
                },
              }
            },
            '2018-03-08': {selected: true},
            '2018-03-09': {
              customStyles: {
                container: {
                  backgroundColor: 'red',
                  elevation: 4,
                },
                text: {
                  color: 'white',
                },
              }
            },
            '2018-03-10': {disabled: true},
            '2018-03-14': {
              customStyles: {
                container: {
                  backgroundColor: 'green',
                },
                text: {
                  color: 'white',
                },
              },
            },
            '2018-03-15': {
              customStyles: {
                container: {
                  backgroundColor: 'black',
                  elevation: 2
                },
                text: {
                  color: 'yellow',
                },
              }
            },
            '2018-03-20': {
              customStyles: {
                container: {
                  backgroundColor: 'pink',
                  elevation: 4,
                },
                text: {
                  color: 'blue',
                },
              }
            },
            '2018-03-21': {disabled: true},
            '2018-03-28': {
              customStyles: {
                container: {
                  backgroundColor: 'green',
                },
                text: {
                  color: 'black',
                  fontWeight: 'bold'
                },
              },
            },
            '2018-03-29': {
              customStyles: {
                container: {
                  backgroundColor: 'white',
                  elevation: 2
                },
                text: {
                  color: 'blue',
                },
              }
            },
            '2018-03-30': {
              customStyles: {
                container: {
                  backgroundColor: 'violet',
                  elevation: 4,
                  borderColor: 'red',
                  borderWidth: 5,
                },
                text: {
                  marginTop: 3,
                  fontSize: 11,
                  color: 'yellow',
                },
              }
            },
            '2018-03-31': {
              customStyles: {
                container: {
                  backgroundColor: 'green',
                  borderRadius: 0,
                },
                text: {
                  color: 'white',
                },
              },
            }}}
          hideArrows={false}
        />

      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2019-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2019-05-08': {textColor: '#666'},
        //    '2019-05-09': {textColor: '#666'},
        //    '2019-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2019-05-21': {startingDay: true, color: 'blue'},
        //    '2019-05-22': {endingDay: true, color: 'gray'},
        //    '2019-05-24': {startingDay: true, color: 'gray'},
        //    '2019-05-25': {color: 'gray'},
        //    '2019-05-26': {endingDay: true, color: 'gray'}}}
         // monthFormat={'yyyy'}
         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />        
      </ScrollView>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }
  
  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }
  
  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }
  
  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
  
  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});




