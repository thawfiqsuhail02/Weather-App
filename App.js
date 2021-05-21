import React from 'react';
import {StyleSheet,View,Text,StatusBar} from 'react-native';
import Search from './screens/Search'
import Home from './screens/Home'
import {NavigationContainer, BaseRouter} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tabs=createBottomTabNavigator()

const App=()=>{
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={({route})=>({
            tabBarIcon:({color})=>{
              let iconname;
              if(route.name==="Home"){
                iconname="home-city-outline"
              }
              else if(route.name==="Search"){
                iconname="city-variant-outline"
              }
              return <MaterialCommunityIcons name={iconname}  size={25} color={color} />
            }
          })}
          tabBarOptions={{
            activeTintColor:"white",
            inactiveTintColor:"grey",
            activeBackgroundColor:"#00aaff",
            inactiveBackgroundColor:"#00aaff"
          }}
        >
          <Tabs.Screen name="Home" component={Home} initialParams={{city:"london"}} />
          <Tabs.Screen name="Search" component={Search} />
        </Tabs.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
