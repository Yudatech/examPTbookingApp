import {observable, action, toJS} from 'mobx';
import { data } from '../firebase/firebase';


export default class UserStore{
  @observable selectedDate="";
  @observable addSessionModalOpen = false;
  @observable loginUser={};
  @observable loginUserRef= "";
  @observable agenda = {};
  @observable agendaItem = {};
  @observable floatBtnVisiable = true;
  @observable needLoadItem = true;

  @action setLoginUser(user){
    this.loginUser = user;
  }

  @action setLoginUserRef(ref){
    this.loginUserRef = ref;
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

 
  @action saveAgenda(i){
    return data.collection('sessions').where(i, "==", this.loginUserRef).get();
  }

  @action setAgenda(i){
    return this.saveAgenda(i).then((sessions)=>{
      this.agenda=sessions;
    })
  }

  @action setAgendaItem(){
    let today = new Date().getTime();
    let items={};

    for (let i = -50; i < 50; i++) {
      const time = today + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      items[strTime] = [];
    }
    
    
    
    this.agenda.docs.map((s) => {
      
      const d = s.data();
      const trd= this.timeToString(d.date);
      const item= {
        name: d.name, 
        events: d.events, 
        timeSlot: d.startTime + " - " + d.finishTime, 
        height: 70
      }
      
      items[trd].push(item);
      return {date:d.date, name: d.name, events: d.events, timeSlot: d.timeSlot, height: 100}
    });

    this.agendaItem = items;

  }

  timeToString(time) {
    const date = new Date(time);
    return date
      .toISOString()
      .split('T')[0];
  }

  @action addAgendaItem(key, item){
   
    this.agendaItem[key].push(item);
    
    console.log("add agenda Item",this.agendaItem);
  }

  @action noNeedLoading(){
    this.needLoadItem = false;
  }

};

