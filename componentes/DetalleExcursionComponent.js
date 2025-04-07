import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={require('./imagenes/40Años.png')}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 120 // Ajustar el texto al centro de la imagen
          }}>
            <Text style={{
              color: 'chocolate',
              fontSize: 40,
              fontWeight: 'bold',
              textAlign: 'center',
              backgroundColor: 'transparent'
            }}>
              {excursion.nombre}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20, textAlign: 'justify', fontSize: 14 }}>
          {excursion.descripcion}
        </Text>
      </Card>
    );
  } else {
    return null;
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES
    };
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (
      <RenderExcursion excursion={this.state.excursiones[+excursionId]} />
    );
  }
}

export default DetalleExcursion;
