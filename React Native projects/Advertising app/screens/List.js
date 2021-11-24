import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import Adlist from "../components/Adlist";


export default ({ navigation }) => {
  const drawer = useRef(null);
  const [category, setCategory] = useState('Все')
  const [phone,setPhone] = useState('')
 
   const getPhone = async () =>{
     setPhone (await AsyncStorage.getItem('phone'))
     
    }
    getPhone()
    
 
 
  const handleLogout = () => {
    AsyncStorage
      .setItem('user', '')
      .then(() => {
        navigation.navigate('Login')
      })
  }

  const navigationView = () => (
    <View style={[ styles.navigationView]}>
    <View style={[ styles.navigationContainer]}>
    <TouchableOpacity onPress={() => navigation.navigate('NewAd')} style={styles.button}>
          <Text style={{fontWeight: "bold", alignSelf: 'flex-start', marginLeft:20}}>
            Добавить обьявление
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Мои обьявления')} style={styles.button}>
          <Text style={{fontWeight: "bold", alignSelf: 'flex-start', marginLeft:20}}>
            Мои обяьвления
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Мои закладки')} style={styles.button}>
          <Text style={{fontWeight: "bold", alignSelf: 'flex-start', marginLeft:20}}>
            Мои закладки
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {setCategory('Все'); drawer.current.closeDrawer()}} style={styles.button}>
          <Text style={{fontWeight: "bold", alignSelf: 'flex-start', marginLeft:20}}>
            Все категории ▼
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setCategory('Дом')}} style={styles.button}>
          <Text style={{alignSelf: 'flex-start', marginLeft:30}}>
            Бытовые услуги
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Электроника')} style={styles.button}>
          <Text style={{alignSelf: 'flex-start', marginLeft:30}}>
            Электроника
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Авто')} style={styles.button}>
          <Text style={{alignSelf: 'flex-start', marginLeft:30}}>
            Автоуслуги
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Грузоперевозки')} style={styles.button}>
          <Text style={{alignSelf: 'flex-start', marginLeft:30}}>
            Грузоперевозки
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('ИТ')} style={styles.button}>
          <Text style={{alignSelf: 'flex-start', marginLeft:30}}>
            ИТ услуги
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => handleLogout()} style={styles.button}>
          <Text style={{fontWeight: "bold", alignSelf: 'flex-start', marginLeft:20}}>
            Выход
          </Text>
        </TouchableOpacity>
     
    </View>
    </View>
  );

  return (
    
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={220}
      drawerPosition={'left'}
      renderNavigationView={navigationView}
    >
      
      <View style={styles.topHeader}>
      
        <TouchableOpacity onPress={() => drawer.current.openDrawer()} style={{flex: 1,maxWidth:50,height:50,paddingTop:10, backgroundColor: "#ec3246"}}>
          <Text style={{fontSize:32}}>
          ←
           </Text>
        </TouchableOpacity>
        <Text style={{flex:2,textAlign:'center',width:150, paddingLeft: 50, paddingRight:40,marginTop:20, fontSize:18,fontWeight:'bold'}}>
          {category}        
          </Text>
        <Text style={{flex:1,marginLeft: 0, marginTop:30}}>
          {phone}         
          </Text>
          
      </View>
      
      <Adlist key={category} ad_category = {category}/>
      
    </DrawerLayoutAndroid>
    
  );
};

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: "#ec3246",
    flex: 1 ,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 45,
    paddingBottom: 40,
    paddingLeft:15,
    margin:0,
    height:90,
    maxHeight: 85
  },
  navigationContainer: {
    backgroundColor: "#ec3246",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 0,
    marginTop: 50
    
  },
  navigationView: {
    backgroundColor: "#ec3246",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 0,
    
    
  },
  button: {
    height: 50,
    backgroundColor: '#ec3246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    
    
    
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

