import React, { useState, useEffect } from 'react'

import {
  View,
  Alert,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


import api from '../services/api'

import favicon from '../assets/favicon.png'

export default ({ navigation }) => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    AsyncStorage
      .getItem('user')
      .then(user =>
        user
          ? navigation.navigate('List')
          : ''
      )
  }, [])

  const handleSubmit = async () => {
    if(phone.length != 7 || password.length<5) {
      Alert.alert('Неправильно введен номер телефона или пароль')
    } 
    else{
    const response =
      await api.post('/login', { phone, password })
        console.log(response.data)
      
        if (typeof response.data === 'object'){
    const { _id} = response.data
        //console.log(_id)
    await AsyncStorage.setItem('user', _id)
    await AsyncStorage.setItem('phone', phone)
    navigation.navigate('List')
    }
    else Alert.alert(response.data)
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image source={favicon} />

      <View style={styles.form}>
        <Text style={styles.label}>НОМЕР ТЕЛЕФОНА *</Text>
        <TextInput
          style={styles.input}
          placeholder="+375(29)*******"
          placeholderTextColor="#999"
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>ПАРОЛЬ *</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите пароль"
          placeholderTextColor="#999"
          secureTextEntry ={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>
            ВХОД / РЕГИСТРАЦИЯ
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
