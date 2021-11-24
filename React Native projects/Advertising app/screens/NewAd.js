import React, { useState, useEffect } from 'react'

import {
  View,
  Pressable,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {Picker} from '@react-native-community/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'


import api from '../services/api'

import favicon from '../assets/favicon.png'

export default ({ navigation }) => {
    
    
  const [ad_name, setAd_name] = useState(navigation.getParam('ad_name'))
  const [description, setDescription] = useState(navigation.getParam('description'))
  const [ad_category, setAd_category] = useState('Дом')
  const [price, setPrice] = useState(navigation.getParam('price'))
  const _id = navigation.getParam('_id')
  console.log(_id)


  useEffect(() => {
    AsyncStorage
      .getItem('user')
      .then(user =>
        user
          ? ''//navigation.navigate('List')
          : ''
      )
  }, [])

  const handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user')
    const response =
      await api.post('/adlist', {_id, ad_name, description, user_id, ad_category, price })
       console.log(response.data)
   
    navigation.navigate('List')
  }
  

  return (
      
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Pressable style={styles.pressable} onPress={() =>navigation.navigate('List')}>
        <Text style={{color:'#ec3246'}}>← Назад</Text>
        </Pressable>
      

      <View style={styles.form}>
      {/* <Image source={favicon} style={{alignSelf:'center', marginBottom:40}} /> */}
        <Text style={styles.label}>Название обьявления</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Название"
          placeholderTextColor="#999"
          
          autoCapitalize="none"
          autoCorrect={false}
          value={ad_name}
          onChangeText={setAd_name}
        />
        
        <Text style={styles.label}>Описание</Text>
        
        <TextInput
          style={styles.inputdescription}
          placeholder="Описание"
          placeholderTextColor="#999"
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          value={description}
          onChangeText={setDescription}
        />
        
        <Text style={styles.label}>Цена</Text>
        
        <TextInput
          style={styles.inputprice}
          placeholder="100$"
          placeholderTextColor="#999"
          
          autoCapitalize="none"
          autoCorrect={false}
          value={price}
          onChangeText={setPrice}
        />
        
        <Text style={styles.label}>Выберите категорию</Text>
        
        <Picker
        selectedValue={ad_category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setAd_category(itemValue)}
        >
        <Picker.Item label="Бытовые услуги" value="Дом" />
        <Picker.Item label="Электроника" value="Электроника" />
        <Picker.Item label="ИТ" value="ИТ" />
        <Picker.Item label="Авто" value="Авто" />
        <Picker.Item label="Грузоперевозки" value="Грузоперевозки" />
        </Picker>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
            Разместить обьявление
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop:100,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8
  },
  pressable: {
    marginLeft:15,
    
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  inputprice: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    width:80,
    marginBottom: 20,
    borderRadius: 2
  },
  
  inputdescription: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 100,
    marginBottom: 20,
    borderRadius: 2
  },

  picker:{
    height: 50,
    width: 150,
    marginBottom: 20
  },

  button: {
    height: 42,
    backgroundColor: '#ec3246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
})
