import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../config'


export default class HomeScreen extends React.Component {
  constructor(){
    super();
    this.state = {
      all_students:[],
      presentList:[],
      absentList:[]
    }
  }
  componentDidMount= async()=>{
    var classref = await db.ref('/').on('value', data =>{
      var all_students = [];
      var classa = data.val();
      for (var i in classa){
        all_students.push(classa[i]);
      }
      console.log(all_students)
      all_students.sort(function(a,b){
        return a.roll_no - b.roll_no;
      })
      this.setState({all_students:all_students})
    })
  }
  updateAttendance(roll_no, status){
    var id = '';
    if(roll_no <= 9){
      id = '0' + roll_no;
    }
    else{
      id = roll_no;
    }
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
    var ref_path = id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]:status,
    });
  }
  render() {
    var all_students = this.state.all_students
    if(all_students.lenght === 0){
      return(
        <View style = {{flex:1}}>
        <Text> No Student Found </Text>
        </View>
      )
    }
    else{
    return (
      <View>
      <View style = {styles.container}>
      <View style = {{flex:1}}>
      {all_students.map((student,index)=>(
        <View style = {styles.subContainer}>
        <View style = {{flex:1,flexDirection:'row'}}>
        <Text style = {{fontSize:15}}>
        {index+1}
        </Text>
        <Text style = {{fontSize:25, fontWeight:'bold'}}>{student.name}</Text>
        </View>
        <View style = {{flex:1,flexDirection:'row'}}>
        <TouchableOpacity 
        style = {{backgroundColor:'green'}}
        onPress = {()=>{
          var presentList = this.state.presentList
          presentList.push(index)
          this.setState({presentList:presentList})
          var roll_no = index+1
          this.updateAttendance(roll_no,'present')
        }}>
        <Text>present</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style = {{backgroundColor:'red'}}
        onPress = {()=>{
          var absentList = this.state.absentList
          absentList.push(index)
          this.setState({absentList:absentList})
          var roll_no = index+1
          this.updateAttendance(roll_no,'absent')
        }}>
        <Text>absent</Text>
        </TouchableOpacity>
        </View>
        </View>
    ))}
      <View style ={{flex:1}}>
      <TouchableOpacity
      style = {styles.button}
    onPress = {()=>{
      this.props.navigation.navigate('SummaryScreen')
    }}>
    <Text style = {{alignSelf:'center',fontSize: 20}}>Submit</Text>
    </TouchableOpacity>
      </View>
      </View>
      </View>
      </View>
    )}}}
    const styles = StyleSheet.create({
      button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 50,
    width: 200,
    height: 50,
    backgroundColor:'pink'
  }
    })