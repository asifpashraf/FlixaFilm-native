import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Navbar = () => {
  return (
    <View style={styles.navcontainer}>
        <Text style={styles.navText}>FlixaFilm</Text>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navcontainer:{
        height:100,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black'
    },
    navText:{
        color:'white',
        fontSize:40,
        fontWeight:'bold'
    }
})