import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from './Navbar'
import Discover from './discover'

const First = () => {
    // console.log("its working");
    
  return (
    <View style={styles.containers}>
      <Navbar/>
      <Text>cool boy</Text>
      <Discover/>
    </View>
  )
}

export default First

const styles = StyleSheet.create({
    containers:{
        flex:1,
        backgroundColor:'green',
        // justifyContent:'center',
        alignItems:'center'
    }
})