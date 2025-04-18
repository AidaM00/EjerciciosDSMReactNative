import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import { connect } from 'react-redux';
import { baseUrl } from '../comun/comun';
import { IndicadorActividad } from './IndicadorActividadComponent'; 


function RenderItem(props) { 
  
  const item = props.item; 
       
  if (props.isLoading) { 
      return( 
          <IndicadorActividad /> 
      ); 
  } 

  else if (props.errMess) { 
      return( 
          <View>  
              <Text>{props.errMess}</Text> 
          </View> 
      ); 
  } 
   
  else {  

    const item = props.item; 
      
    if (item != null) {
      return (
        <Card>
          <Card.Image source={{ uri: baseUrl + item.imagen }}>
            <Text
              style={{
                color: 'chocolate',
                fontSize: 40,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 30
              }}
            >
              {item.nombre}
            </Text>
          </Card.Image>

          <Text style={{ margin: 20, fontSize: 14 }}>
            {item.descripcion}
          </Text>
        </Card>
      ); 
    } 
    else { 
        return(<View></View>); 
    }
  }
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter(c => c.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess}
        />
        <RenderItem item={this.props.excursiones.excursiones.filter(e => e.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem item={this.props.actividades.actividades.filter(a => a.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades
  };
};

export default connect(mapStateToProps)(Home);
