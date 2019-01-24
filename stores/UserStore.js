import {observable, action} from 'mobx';


export default class UserStore{
  @observable selectedDate="";
  @observable firebase= firebase;

  @action setSelectedDate(date){
    this.selectedDate= date;
  }
};

