import {observable, action} from 'mobx';


export default class UserStore{
  @observable selectedDate="";
  @observable addSessionModalOpen = false;
  @observable loginUser={};
  @observable agenda = {};
  @observable floatBtnVisiable = true;

  @action setLoginUser(user){
    this.loginUser = user;
    console.log(this.loginUser)
  }

  @action setSelectedDate(date){
    this.selectedDate= date;
  }

  @action openAddSessionModal(){
    this.addSessionModalOpen = true;
    this.floatBtnVisiable = false;
  }

  @action closeAddSessionModal(){
    this.addSessionModalOpen = false;
    this.floatBtnVisiable = true;
  }

  @action setAgenda(agenda){
    this.agenda = agenda;
  }

};

