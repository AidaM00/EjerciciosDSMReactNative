import React, { Component } from 'react';
import Constants from 'expo-constants';
import { Platform, View, Image, StyleSheet, Text } from 'react-native';
import { NavigationContainer, DrawerActions} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Home from './HomeComponent';
import QuienesSomos from './QuienesSomosComponent';
import Contacto from './ContactoComponent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) { 
  return ( 
    <DrawerContentScrollView {...props}> 
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}> 
        <View style={styles.drawerHeader}> 
          <View style={{flex:1}}> 
            <Image source={require('./imagenes/logo.png')} style={styles.drawerImage} /> 
          </View> 
          <View style={{flex: 2}}> 
            <Text style={styles.drawerHeaderText}> Gaztaroa</Text> 
          </View> 
        </View> 
        <DrawerItemList {...props} /> 
      </SafeAreaView> 
    </DrawerContentScrollView> 
  ); 
} 

function CalendarioNavegador() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#015afc' },
      headerTitleStyle: { color: '#fff' },
    }}>
      <Stack.Screen
        name="CalendarioScreen"
        component={Calendario}
        options={({ navigation }) => ({
          title: 'Calendario Gaztaroa',
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome"
              color="#fff"
              containerStyle={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{
          title: 'Detalle Excursión',
        }}
      />
    </Stack.Navigator>
  );
}

function HomeNavegador() {
  return (
    <Stack.Navigator
      screenOptions={{
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#015afc' },
      headerTitleStyle: { color: '#fff' },
    }}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={({ navigation }) => ({
          title: 'Campo Base',
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome"
              color="#fff"
              containerStyle={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

function QuienesSomosNavegador() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#015afc' },
      headerTitleStyle: { color: '#fff' },
    }}>
      <Stack.Screen
        name="QuiénesSomosScreen"
        component={QuienesSomos}
        options={({ navigation }) => ({
          title: 'Quiénes somos',
          headerLeft: () => (<Icon name="menu" size={28} color= 'white' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }/>
          )
        })}
      />
    </Stack.Navigator>
  );
}

function ContactoNavegador() {
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: '#fff',
      headerStyle: { backgroundColor: '#015afc' },
      headerTitleStyle: { color: '#fff' },
    }}>
      <Stack.Screen
        name="ContactoScreen"
        component={Contacto}
        options={({ navigation }) => ({
          title: 'Contacto',
          headerLeft: () => (
            <Icon
              name="bars"
              type="font-awesome"
              color="#fff"
              containerStyle={{ marginLeft: 15 }}
              onPress={() => navigation.toggleDrawer()}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}

function DrawerNavegador() {
  return (
    <Drawer.Navigator
      initialRouteName="Campo base"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#c2d3da' },
      }}
    >
      <Drawer.Screen
        name="Campo base"
        component={HomeNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="home" type="font-awesome" size={24} color={tintColor} />
          )
        }}
      />
      <Drawer.Screen
        name="Quiénes somos"
        component={QuienesSomosNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />
          )
        }}
      />
      <Drawer.Screen
        name="Calendario"
        component={CalendarioNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="calendar" type="font-awesome" size={24} color={tintColor} />
          )
        }}
      />
      <Drawer.Screen
        name="Contacto"
        component={ContactoNavegador}
        options={{
          drawerIcon: ({ tintColor }) => (
            <Icon name="address-card" type="font-awesome" size={22} color={tintColor} />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
          <DrawerNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
  }, 
  drawerHeader: { 
    backgroundColor: '#015afc', 
    height: 100, 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    flexDirection: 'row' 
  }, 
  drawerHeaderText: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold' 
  }, 
  drawerImage: { 
    margin: 10, 
    width: 80, 
    height: 60 
  } 
}); 

export default Campobase;
