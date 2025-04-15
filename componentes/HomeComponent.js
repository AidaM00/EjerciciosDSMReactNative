import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
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
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      cabeceras: CABECERAS,
      actividades: ACTIVIDADES
    };
  }

  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
        />
        <RenderItem
          item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]}
        />
        <RenderItem
          item={this.state.actividades.filter((actividad) => actividad.destacado)[0]}
        />
      </ScrollView>
    );
  }
}

export default Home;
