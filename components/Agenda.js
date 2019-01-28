import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Agenda} from 'react-native-calendars';
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
      items={this.props.userStore.agendaItem}
      loadItemsForMonth={this
      .loadItems
      .bind(this)}
      minDate={'2018-12-01'}
      maxDate={'2019-06-30'}
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

  async loadItems() {
    if(!this.props.userStore.needLoadItem){
      return;
    }
    this.props.userStore.setAgendaItem();  
    this.props.userStore.noNeedLoading();
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
        {this.props.userStore.loginUser.role === "PT"
        ?
        <Text>{item.name || ""}</Text>
        :
        <Text></Text>

      }
        
        <Text>{item.events || ""}</Text>
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