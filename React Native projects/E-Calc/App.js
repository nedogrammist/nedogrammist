import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import axios from 'axios';
import * as EVcarsList from './data/EVvehicles.json'


export default function App() {
 
  
  const [update, setUpdate] = useState(false)
  const [ecar, setEcar] = useState('new')
  const [ecarNewColor, setEcarNewColor] = useState('#0476D0')
  const [ecarUsedColor, setEcarUsedColor] = useState('#FFFFFF')
  const [petrolCar, setPetrolCar] = useState('new')
  const [petrolCarNewColor, setPetrolCarNewColor] = useState('#0476D0')
  const [petrolCarUsedColor, setpetrolCarUsedColor] = useState('#FFFFFF')
  const [allCarMakes, setAllCarMakes] = useState([])
  const [petrolCarMake, setPetrolCarMake]= useState('Марка')
  const [allCarModels, setAllCarModels] = useState([])
  const [petrolCarModel, setPetrolCarModel] = useState('')
  const [eCarMakes, setECarMakes] = useState([])
  const [eCarMake, setECarMake] = useState('')
  const [eCarModels, setECarModels] = useState ([])
  const [eCarModel, setECarModel] = useState ('')
  const [eCarYears, setECarYears] = useState([])
  const [eCarYear, setECarYear] = useState('')
  const [currentPetrolCar, setCurrentPetrolCar] = useState([])
  const [petrolCarYears, setPetrolCarYears] = useState([])
  const [petrolCarYear, setPetrolCarYear] = useState('')
  const [petrolCarEngines, setPetrolCarEngines] = useState([])
  const [petrolCarEngine, setPetrolCarEngine] = useState('Мотор')
  useEffect(()=>{
   const loadcars = async () =>{
    
    const response = await axios.get('https://www.fueleconomy.gov/ws/rest/ympg/shared/menu/make')
    await setAllCarMakes(response.data.menuItem.map((item)=> item.text))
    
    
    let EV = []
    for (let key in EVcarsList){
     EV[key] = EVcarsList[key].make
      
  }
    EV = EV.filter((item, index)=> EV.indexOf(item) === index)
    EV.sort()
  setECarMakes(EV)
  
    
  }
 loadcars()
 
}, [update],)
 

  const loadAllCarModels = async (make) => {
  const response = await axios.get(`https://www.fueleconomy.gov/ws/rest/ympg/shared/menu/model?make=${make}`)
  
  if (response.data.menuItem instanceof Array){
    setAllCarModels(response.data.menuItem.map((item)=> item.text))
  }
  else{
  setAllCarModels([response.data.menuItem.text])
  }
}
  const loadEcarModels = async (make) => {
    let models = []
    for (let key in EVcarsList) {
      
      if (EVcarsList[key].make === make)
      models.push(EVcarsList[key].model) 
    }
    models = models.filter((item, index)=> models.indexOf(item) === index)
    models.sort()
    setECarModels (models)
     
  }
   const loadEcarYears = (model) => {
    let year = []
    let make = eCarMake
    
    for (let key in EVcarsList) {
      if (EVcarsList[key].make === make && EVcarsList[key].model === model){
        year.push((EVcarsList[key].year).toString()) 
      }
    }
    setECarYears(year)
    
  }
  const loadPetrolCarYears = async (model) =>{
    

    const response = await axios.get(`https://www.fueleconomy.gov/ws/rest/ympg/shared/vehicles?make=${petrolCarMake}&model=${model}`)
    
    let year = []
    if (response.data.vehicle instanceof Array){
    year = response.data.vehicle.map(item => item.year)
    year = year.filter((item,index) => year.indexOf(item) === index)
    setPetrolCarYears(year)
    setCurrentPetrolCar(response.data.vehicle)
    }
    else{
      setPetrolCarYears([response.data.vehicle.year])
      setCurrentPetrolCar([response.data.vehicle])
    
    }
  }

  const loadPetrolCarEngines = (year) =>{
   let engines = currentPetrolCar.filter((item)=> item.year === year)
    
    engines = engines.map(item => item.displ)
    engines = engines.filter((item,index) => engines.indexOf(item) === index)
    
    
    setPetrolCarEngines(engines)
    
    setTimeout(()=>console.log(petrolCarEngine), 1000)
  }

  
 const ecarNewButton = () => {
    
    setEcar('new')
    setEcarNewColor('#0476D0')
    setEcarUsedColor('#FFFFFF')
    
  }
  const ecarUsedButton = () => {
    
    setEcar('used')
    setEcarUsedColor('#0476D0')
    setEcarNewColor('#FFFFFF')
    
  }

  const petrolCarNewButton = () => {
    
    setPetrolCar('new')
    setPetrolCarNewColor('#0476D0')
    setpetrolCarUsedColor('#FFFFFF')
    
  }
  const petrolCarUsedButton = () => {
    
    setPetrolCar('used')
    setpetrolCarUsedColor('#0476D0')
    setPetrolCarNewColor('#FFFFFF')
    
  }
  
  let usedcarpicker =(kindOfCar) =>{
    if ((petrolCar === 'used' && kindOfCar === 'petrol')  || (ecar ==='used' && kindOfCar ==='electric')) {
      return(
      
     <View style={{alignSelf:'stretch', borderWidth:0.5, borderRadius:5, marginBottom:10, justifyContent:'center', borderColor:'#0476D0', flexDirection:'column'}}>
        <Picker mode={'dropdown'}  selectedValue= 'Пробег' style={{padding:25}} >
        <Picker.Item label="Пробег" value="Дом" style={{fontSize:20, borderWidth:1}} />
        </Picker>
     </View>
      )
  }
    else return  null
  }
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={{fontSize: 20, color: '#FFFFFF'}}>ϟ Eprofit </Text>
      </View>
      
      <View style={{ alignItems:'flex-start', justifyContent:'center', padding:10, elevation:2, marginBottom:5}}>
        <Text style={{ fontSize:22, marginTop:10, marginLeft:10, color:'#000000'}}>Выберите электромобиль</Text>
            <View style={{flexDirection:'row', alignSelf:"stretch", justifyContent:'space-around'}}>
              <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
                <Picker mode={'dropdown'}  selectedValue={eCarMake} onValueChange ={(itemValue, itemIndex)=>{ setECarMake(itemValue), loadEcarModels(itemValue), loadEcarYears() }} style={styles.picker}  >
                {eCarMakes.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
              </Picker></View>
            <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
                <Picker mode={'dropdown'}  selectedValue={eCarModel}  onValueChange ={(itemValue, itemIndex)=> {setECarModel(itemValue), loadEcarYears(itemValue)}} style={styles.picker}>
                <Picker.Item label={'Модель'} value={'Модель'} style={{fontSize:20}} />
                {eCarModels.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
              </Picker></View>              
           </View>
           <View style={{flexDirection:'row', alignSelf:"stretch", justifyContent:'space-around'}}>
              <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
                <Picker mode={'dropdown'}  selectedValue={eCarYear} onValueChange ={(itemValue, itemIndex)=> setECarYear(itemValue)} style={styles.picker}  >
                <Picker.Item label={'Год'} value={'Год'} style={{fontSize:20}} />
                {eCarYears.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
              </Picker></View>
                        
           </View>
          
          <View style={{flexDirection:'row', alignItems:'stretch', alignSelf:'stretch', justifyContent:'center', marginBottom:0, marginTop:10, paddingBottom:20}}>
            <TouchableOpacity onPress ={() => ecarNewButton()} style={{flex:1, backgroundColor: ecarNewColor, padding:10, borderTopLeftRadius:5, borderBottomLeftRadius:5, elevation: 2}} >
              <Text style={{alignSelf:'center' ,fontSize: 20, color: ecarUsedColor }}>Новый</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress ={() => ecarUsedButton()} style={{flex:1, backgroundColor: ecarUsedColor, padding:10, borderTopRightRadius:5, borderBottomRightRadius:5, elevation: 2 }}>
              <Text style={{alignSelf:'center' ,fontSize: 20, color: ecarNewColor, }}>Подержанный</Text>
            </TouchableOpacity>          
          </View>
          
           {usedcarpicker('electric')}  
      </View>
      <View style={{ alignItems:'flex-start', justifyContent:'center', padding:10, elevation:2 }}>
                <Text style={{fontSize:22, marginTop:10, marginLeft:10, color:'#000000'}}>Выберите автомобиль для сравнения</Text>
      
          <View style={{flexDirection:'row', alignSelf:"stretch", justifyContent:'space-around'}}>
            <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
              <Picker mode={'dropdown'}  selectedValue={petrolCarMake} onValueChange= {(itemValue, itemIndex)=> {setPetrolCarMake(itemValue), loadAllCarModels(itemValue), setPetrolCarYear('')}} style={styles.picker}>
                {allCarMakes.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
                
            </Picker></View>
            <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
               <Picker mode={'dropdown'} selectedValue={petrolCarModel} onValueChange ={(itemValue, itemIndex) => { setPetrolCarModel(itemValue), loadPetrolCarYears(itemValue)}} style={styles.picker}>
               <Picker.Item label={'Модель'} value={'Модель'} style={{fontSize:20}} />
                 {allCarModels.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
                
            </Picker></View>
          </View>
          
          <View style={{flexDirection:'row', alignSelf:"stretch", justifyContent:'space-around'}}>
            <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
              <Picker mode={'dropdown'}  selectedValue={petrolCarYear} onValueChange= {(itemValue, itemIndex)=> {setPetrolCarYear(itemValue), loadPetrolCarEngines(itemValue)}} style={styles.picker}>
              <Picker.Item label={'Год'} value={'Год'} style={{fontSize:20}} />
                {petrolCarYears.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
                
            </Picker></View>
            <View style={{borderWidth:0.5, borderRadius:5, margin:10, justifyContent:'center', borderColor:'#0476D0'}}>
               <Picker mode={'dropdown'} selectedValue={petrolCarEngine} onValueChange ={(itemValue, itemIndex) => {setPetrolCarEngine(itemValue) }} style={styles.picker}>
               <Picker.Item label={'Мотор'} value={'Мотор'} style={{fontSize:20}} />
                 {petrolCarEngines.map((item, key) => (<Picker.Item label={item} value={item} key={key} style={{fontSize:20}} />))}
                
            </Picker></View>
          </View>
           
           
           <View style={{flexDirection:'row', alignItems:'stretch', alignSelf:'stretch', justifyContent:'center', marginBottom:0, marginTop:10, paddingBottom:20}}>
           <TouchableOpacity onPress ={() => petrolCarNewButton()} style={{flex:1, backgroundColor: petrolCarNewColor, padding:10, borderTopLeftRadius:5, borderBottomLeftRadius:5, elevation: 2}} >
          <Text style={{alignSelf:'center' ,fontSize: 20, color: petrolCarUsedColor }}>Новый</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress ={() => petrolCarUsedButton()} style={{flex:1, backgroundColor: petrolCarUsedColor, padding:10, borderTopRightRadius:5, borderBottomRightRadius:5, elevation: 2 }}>
          <Text style={{alignSelf:'center' ,fontSize: 20, color: petrolCarNewColor, }}>Подержанный</Text>
          </TouchableOpacity>
           </View>
              <View style={{alignSelf:'stretch'}}>
                {usedcarpicker('petrol')}
                <TextInput placeholder = 'Введите дальность поездки (км)' style={{borderWidth:0.5, alignSelf:'stretch', borderColor:'#0476D0',borderRadius:5, marginBottom:10, padding:10, fontSize:20 }}>

                </TextInput>
                </View>
           
           
           
            
     
          <TouchableOpacity style={{alignSelf:'stretch', backgroundColor: '#0476D0', borderRadius:5}}>
             <Text style={{alignSelf:'center' ,fontSize: 20, color: '#cfdfda', margin:10,}}>Press</Text>
          </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  topHeader: {
    backgroundColor: "#0476D0",
    flex: 1 ,
    alignItems: "center",
    
    justifyContent: "center",
    paddingTop: 45,
    paddingBottom: 40,
    paddingLeft:15,
    margin:0,
    height:90,
    maxHeight: 85
  },
  picker :{
    padding:25,
    alignSelf:'stretch', 
    height:25, 
    width:160,
    
    
  },
});
