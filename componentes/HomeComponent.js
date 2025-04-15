import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import { connect } from 'react-redux'; 
import { baseUrl } from '../comun/comun';

function RenderItem(props) {
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
  } else {
    return null;
  }
}

class Home extends Component {
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
        />
        <RenderItem
          item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
        />
        <RenderItem
          item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]}
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
