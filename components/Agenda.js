import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {data, firebase} from '../firebase/firebase';
import {inject, observer} from 'mobx-react';

@inject("userStore")
@observer export class AgendaCp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }
  render() {
    return (
      <Agenda
      items={this.state.items}
      loadItemsForMonth={this
      .loadItems
      .bind(this)}
      minDate={'2019-01-01'}
      maxDate={'2019-01-30'}
      pastScrollRange={0}
      futureScrollRange={5}
      renderItem={this
      .renderItem
      .bind(this)}
      renderEmptyDate={this
      .renderEmptyDate
      .bind(this)}
      rowHasChanged={this
      .rowHasChanged
      .bind(this)}/>
     );
  }

  async loadItems(day) {

    let today = new Date().getTime();

    for (let i = -15; i < 15; i++) {
      const time = today + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      this.state.items[strTime] = [];
    }

    
         this.props.userStore.agenda.docs.map((s) => {
            let d = s.data();
            const trd= this.timeToString(d.date.seconds*1000);
            this.state.items[trd].push({
              name: d.name, 
              text: d.text, 
              timeSlot: d.startTime + " - " + d.finishTime, 
              height: 100});
            return {date:d.date, name: d.name, text: d.text, timeSlot: d.timeSlot, height: 100}
          });

          const newItems = {};
          Object
            .keys(this.state.items)
            .forEach(key => {
              newItems[key] = this.state.items[key];
            });
          this.setState({
            items: newItems
          });   


  }


  renderItem(item) {
    return (
      <View
        style={[
        styles.item, {
          height: item.height
        }
      ]}>
        <Text>{item.timeSlot}</Text>
        <Text>{item.name || ""}</Text>
        <Text>{item.text || ""}</Text>
      </View>

    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date
      .toISOString()
      .split('T')[0];
  }
}

const styles = StyleSheet.create({
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
    flex: 1,
    paddingTop: 30,
  }
});