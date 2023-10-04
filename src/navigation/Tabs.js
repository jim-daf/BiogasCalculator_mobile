import * as React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {Ionicons} from 'react-native-vector-icons/Ionicons'

import MultiStepForm from './screens/MultiStepForm'
import UserManual from './screens/UserManual'


const homeName='Αρχική'
const userManualName='Εγχειρίδιο Χρήσης'

const Tab = createBottomTabNavigator();

export default function Tabs({navigation}){
    
    return (
        <NavigationContainer>
        <Tab.Navigator 
        
        screenOptions={{
            "tabBarShowLabel":false,
        }
            
        }
        
       
        >
        
        <Tab.Screen name = {homeName} component={MultiStepForm} options={
            {
                tabBarIcon:({focused}) => (
                    <View>
                        <Image source={require('../../home.png')} resizeMode='contain' 
                        style={{
                            ...focused ? { tintColor: '#007AFF'} : { tintColor : '#748c94'},
                            ...styles.image
                        }}
                        />
                        <Text style={{
                            ...focused ? { color: '#007AFF'  } : { color : '#748c94'}
                            
                        }}>Αρχική</Text>
                    </View>
                )
                /*headerRight: () => (
                    <Image source={require('../../assets/images/act4energylogowhite.png')} resizeMode='contain' 
                        style={{
                            
                            ...styles.logo
                        }}
                        />
            ),*/
            }
        }/>
        <Tab.Screen name = {userManualName} component={UserManual} options={
            {
                tabBarIcon:({focused}) => (
                    <View>
                        <Image source={require('../../userManual.png')} resizeMode='contain' 
                        style={{
                            ...focused ? { tintColor: '#007AFF'  } : { tintColor : '#748c94'},
                            ...styles.image
                        }}
                        />
                        <Text style={{
                            ...focused ? { color: '#007AFF'  } : { color : '#748c94'}
                            
                        }}>Εγχειρίδιο Χρήσης</Text>
                    </View>
                )
            }
        }/>

        </Tab.Navigator>

        </NavigationContainer>
    )
    
}
const styles=StyleSheet.create({
    image:{
        width:18,
        height:18,
        alignSelf:"center",
        
    },
    logo:{
        
        backgroundColor:'#007AFF',
        width:85,
        height:56,
    }
})