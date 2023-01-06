import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator , FlatList } from 'react-native';
import axios from 'axios';

export default class App extends Component{
  constructor(){
    super();
    this.setState={
      loader :false,
      DATA: []
    }
  }
  getData(){
    this.setState({loader: true})
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((response)=>{
      if(response.length>0){
        this.setState({DATA: response})
      }
      this.setState({loader: false})
      console.log('your response:',response)
    })
    .catch((error)=>{
      this.setState({loader:false})
      // console.log('error is:', error)
    })
  }
  getAxiosData(){
    this.setState({loader : true})
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response)=>{
      this.setState({loader: false})
      console.log('axios response:',response)
    })
    .catch((error)=>{
      this.setState({loader: false})
      console.log('axios error',error)
    })
  }
  componentDidMount(){
    this.getData()
  }
  render(){
    const renderItem= ({item}) =>(
      <View style={styles.itemContainer}>
        <Text>{item.username}</Text>
      </View>
    )
    return(
      <View style={styles.container}>
        <ActivityIndicator size={20} color='blue' animating={this.state.loader}/>
        <Text style={styles.textStyle}
        onPress={()=> this.getAxiosData()}>hi</Text>
        <FlatList style={{width:'95%', marginTop: 10}}
        data={this.state.DATA}
        renderItem={this.renderItem}/>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  textStyle :{
    fontSize: 24,
    fontWeight:'bold'

  },
  itemContainer:{
    width: '100%',
    padding: 10,
    backgroundColor:'#eeeeee'

  }

});


