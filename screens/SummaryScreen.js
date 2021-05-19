import db from '../config'
import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class SummaryScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      all_students:[],
      presentList:[],
      absentList:[]
    }
  }
  getTodaysDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if(dd<10){
      dd= '0' +dd;
    }
    if(mm<10){
      mm = '0' +mm;
    }
    today = dd + '-'+mm+'-'+'-'+yyyy;
    return today
  }
  componentDidMount= async()=>{
    var today = await this.getTodaysDate()
    var classref = db.ref('/').on('value', data =>{
      var all_students = [];
      var classa = data.val();
      var presentList = []
      var absentList = []
      var size = 0
      for (var i in classa){
        if(classa[i][today]==='present'){
          console.log('inPresent')
          presentList.push(classa[i])
        }
        else if(classa[i][today]==='absent'){
          absentList.push(classa[i])
        }
        all_students.push(classa[i]);
      }
      size = len(presentList)
      console.log('size is ' + size)
      this.setState({presentList:presentList, absentList:absentList})
      all_students.sort(function(a,b){
        return a.roll_no - b.roll_no;
      })
      
    })
  }
  render(){
  return(
    <View><Text>{this.state.presentList}</Text>
    <Text>Hi</Text>
    </View>
  )}
  }
  
  
  