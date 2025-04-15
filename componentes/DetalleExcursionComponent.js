import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed'; 
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios'; 
import { baseUrl } from '../comun/comun';

function RenderExcursion(props) {
  const { excursion } = props;

  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + excursion.imagen }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 120
          }}>
            <Text style={{
              color: 'white',
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

        <View style={{ alignItems: 'flex-start', marginLeft: 10, marginBottom: 10 }}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </View>
      </Card>
    );
  } else {
    return null;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderItem = ({ item }) => {
    const fechaCruda = item.dia.replace(/\s+/g, '');
    const fecha = new Date(fechaCruda);

    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 14 }}>{item.valoracion} Stars</Text>
        {!isNaN(fecha) && (
          <Text style={{ fontSize: 12 }}>
            -- {item.autor},
            {new Intl.DateTimeFormat('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(fecha)},
            {fecha.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Card>
      <Card.Title style={{ fontSize: 20, textAlign: 'center' }}>Comentarios</Card.Title>
      <Card.Divider />
      <FlatList
        data={comentarios}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
      />
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  }

  render() {
    const { excursionId } = this.props.route.params;
    const excursion = EXCURSIONES[+excursionId];
    const comentariosFiltrados = COMENTARIOS.filter(
      comentario => comentario.excursionId === excursionId
    );

    return (
      <ScrollView>
        <RenderExcursion
          excursion={excursion}
          favorita={this.state.favoritos.includes(excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario comentarios={comentariosFiltrados} />
      </ScrollView>
    );
  }
}

export default DetalleExcursion;
