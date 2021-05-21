import React,{useState,useEffect} from 'react'
import {StyleSheet,Text,View,Image, Alert} from 'react-native'
import {Title,Card} from 'react-native-paper'
import Header from './Header'
import AsyncStorage from '@react-native-community/async-storage';

const Home=(props)=>{
    const [info,setinfo]=useState({
        name:"loading",
        temperature:"loading",
        humidity:"loading",
        description:"loading",
        icon:"loading"
    })
    useEffect(()=>{
        fetchdata()
    },[])
    const fetchdata=async()=>{
        let citydata=await AsyncStorage.getItem("newcity")
        if(!citydata){
            let mycity=props.route.params.city
            citydata=mycity
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${citydata}&APPID=fbb1ce4d0c8130e04c857e6cb7437340&units=metric`)
        .then(res=>res.json())
        .then(data=>{
            setinfo({
                name:data.name,
                temperature:data.main.temp,
                humidity:data.main.humidity,
                description:data.weather[0].description,
                icon:data.weather[0].icon
            })
        }).catch(err=>Alert.alert("Something went wrong"))
    }
    if(props.route.params!="london"){
        fetchdata()
    }
    return(
        <View style={{flex:1}}>
            <Header name="Thawfiq's Weather App" />
            <View style={{alignItems:"center"}}>
                <Title>{info.name}</Title>
                <Image 
                    style={{width:120,height:120,margin:10}}
                    source={{uri:"https://openweathermap.org/img/w/"+info.icon+".png"}} 
                />
            </View>
            <Card style={{margin:5,padding:10}}>
                <Title style={{color:"#00aaff",fontSize:19}}>Temperatute- {info.temperature} *c</Title>
            </Card>
            <Card style={{margin:5,padding:10}}>
                <Title style={{color:"#00aaff",fontSize:19}}>Humidity- {info.humidity}</Title>
            </Card>
            <Card style={{margin:5,padding:10}}>
                <Title style={{color:"#00aaff",fontSize:19}}>Description- {info.description}</Title>
            </Card>
        </View>
    )
}

export default Home