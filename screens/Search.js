import React,{useState} from 'react'
import {Text,View,FlatList} from 'react-native'
import {TextInput,Button,Card} from 'react-native-paper'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';

const searchers=(props)=>{

    const [city,setcity]=useState("")
    const [sugg,setsugg]=useState([])

    const searchcities=(text)=>{
        setcity(text)
        const wunder="https://autocomplete.wunderground.com/aq?query="+text
        const accu="https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=Qp8JNK484dR3TxEtdAlaIGsvWg0XGrJP&q="+text
        const open=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=fbb1ce4d0c8130e04c857e6cb7437340`
        const mukesh=`https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`
        fetch(accu)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.slice(0,9))
            setsugg(data.slice(0,9))
        }).catch(err=>console.log(err))
    } 
    const btnclick=async()=>{
        await AsyncStorage.setItem("newcity",city)
        props.navigation.navigate("Home",{city:city})
    }
    const cardclick=async(data)=>{
        await AsyncStorage.setItem("newcity",data)
        props.navigation.navigate("Home",{city:data})
    }
    return(
        <View style={{flex:1}}>
            <Header name="Thawfiq's Weather App"/>
            <TextInput
                label="Enter city name"
                theme={{colors:{primary:"#00aaff"}}}
                value={city}
                onChangeText={(text)=>searchcities(text)} 
            />
            <Button style={{margin:20}} mode="outlined" theme={{colors:{primary:"#00aaff"}}} onPress={()=>{btnclick()}}>
                Search City
            </Button>
            <FlatList
                data={sugg}
                renderItem={({item})=>{
                    return(
                        <Card style={{margin:2,padding:12}} onPress={()=>cardclick(item.LocalizedName)}>
                            <Text>{item.LocalizedName}, {item.AdministrativeArea.LocalizedName}</Text>
                        </Card>
                    )
                }}
                keyExtractor={(item)=>item.Key}
            />
        </View>
    )
}

export default searchers