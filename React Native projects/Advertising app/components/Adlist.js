import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'

import {
  View,
  Text,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native'

import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Adlist = ({ad_category, navigation}) => {
    const [ads, setAds] = useState([])
    const [update, setUpdate] = useState(false)
    const [search, setSearch] = useState([])
    useEffect(() =>{
        
        const loadAds = async () =>{
           let user_id =''
           let response = ''
           if (ad_category === 'Мои обьявления'){
             user_id = await AsyncStorage.getItem('user')
            }

            if (ad_category === 'Мои закладки'){
                user_id = await AsyncStorage.getItem('user')
                response =
                await api.get('/bookmarks',{params: {user_id}})
            }
            else{
            response = 
            await api.get('/adlist', {
                params: {ad_category, user_id}
            })
            }
            //console.log(response.data)
            setAds(response.data)
            setSearch(response.data)
            setUpdate(false)
            
        }
    loadAds()
    
    }, [update],)
    
    const handleEdit = (_id, ad_name, description, price) =>{

        navigation.navigate('NewAd', {_id, ad_name, description, price} )
        
    }
    const handleDelete = async (_id) =>{
        console.log(_id)
        await api.post('/adlist/delete', {_id})
         setUpdate(true)
    }
    const handlePostBookmark = async (ad_id) =>{
        user_id = await AsyncStorage.getItem('user')
        console.log(ad_id, user_id)
        await api.post('/bookmarks', {ad_id, user_id})
        Alert.alert('Обявление добавлено в закладки!')
    }
    const handleDeleteBookmark = async (_id, user_id) =>{
        user_id = await AsyncStorage.getItem('user')
        console.log(_id)
        await api.post('/bookmarks/delete', {_id, user_id})
        setUpdate(true)
    }
    function handleSearch (text){
        searched = ads.filter(item =>
         item.ad_name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
         item.description.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
        
         setSearch(searched)  
           
       
        
    }
  
    let renderItem =({item}) =>(
        <View style={styles.listItem}>
            
             <Text style={styles.company}>
              {item.ad_name}
             </Text>
             <Text style={styles.description}>
              {item.description}
             </Text>
            
             <Text style={styles.price}>
              {item.price
                ? `$${item.price}`
                : 'FREE'
              }
            </Text>
             
            <TouchableOpacity style={styles.button} onPress={() => handlePostBookmark(item._id)}>
              <Text
                style={styles.buttonText}
                
              >
                Добавить в закладки
              </Text>
            </TouchableOpacity>

            </View>
    )
    
    const renderEditableItem =({item}) =>(
        <View style={styles.listItem}>
            
             <Text style={styles.company}>
              {item.ad_name}
             </Text>
             <Text style={styles.description}>
              {item.description}
             </Text>
            
             <Text style={styles.price}>
              {item.price
                ? `$${item.price}`
                : 'FREE'
              }
            </Text>
             
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item._id,item.ad_name, item.description, item.price)}>
              <Text
                style={styles.buttonText}
                
              >
                Редактировать
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDelete(item._id)}>
              <Text
                style={styles.buttonText}
                
                
              >
                Удалить
              </Text>
            </TouchableOpacity>

            </View>
    )

    let renderBookmarks =({item}) =>(
        <View style={styles.listItem}>
            
             <Text style={styles.company}>
              {item.ad_name}
             </Text>
             <Text style={styles.description}>
              {item.description}
             </Text>
            
             <Text style={styles.price}>
              {item.price
                ? `$${item.price}`
                : 'FREE'
              }
            </Text>
             
            <TouchableOpacity style={styles.button} onPress={() => handleDeleteBookmark(item._id)}>
              <Text
                style={styles.buttonText}
                
              >
                Удалить из закладок
              </Text>
            </TouchableOpacity>

            </View>
    )
     

              if (ad_category ==="Мои обьявления") renderItem = renderEditableItem
              if (ad_category ==="Мои закладки") renderItem = renderBookmarks
              
return(
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Поиск'}
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => handleSearch(text)}
          
          />
        <FlatList
        style={styles.list}
        data={search}
        keyExtractor={ad=>ad._id}
        vertical
        showsVerticalScrollIndicator={true}
        renderItem={renderItem}
        
        />
    </View>

)

}
const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      marginBottom:20,
      paddingBottom: 130
    },
  
    title: {
      fontSize: 24,
      color: '#444',
      paddingHorizontal: 20,
      marginBottom: 10
    },
  
    bold: {
      fontWeight: 'bold'
    },
  
    list: {
      paddingHorizontal: 20
    },

    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      paddingHorizontal: 20,
      fontSize: 16,
      color: '#444',
      height: 44,
      margin: 10,
      borderRadius: 2
    },
    listItem: {
      marginRight: 15,
      borderBottomWidth:0.5,
      borderBottomColor: 'gray'
    },
  
    thumbnail: {
      width: 200,
      height: 120,
      resizeMode: 'cover',
      borderRadius: 2
    },
  
    company: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10
    },
    description: {
        fontSize: 18,
        
        color: '#333',
        marginTop: 10
      },
  
    price: {
      fontSize: 15,
      color: '#999',
      marginTop: 5
    },
  
    button: {
      height: 32,
      backgroundColor: '#ec3246',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginTop: 15,
      marginBottom:5
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 16
    }
  })

  export default withNavigation(Adlist)