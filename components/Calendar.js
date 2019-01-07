import React from 'react';
import { View, StyleSheet } from 'react-native';
import {Calendar} from 'react-native-calendars';

export class CalendarCp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return <Calendar
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
  />;
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
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