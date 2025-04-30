import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from '@rneui/themed'; 
import { EXCURSIONES } from '../comun/excursiones';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { colorGaztaroaOscuro } from '../comun/comun';
import { Button, Input } from '@rneui/themed';
import { Modal } from 'react-native'; 
import { Rating } from 'react-native-ratings';

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

        <Text style={{ margin: 20, fontSize: 14 }}>
          {excursion.descripcion}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
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
          <Icon
            raised
            reverse
            name='pencil'
            type='font-awesome'
            color='#015afc'
            onPress={props.toggleModal} 
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
            -- {item.autor},{' '} 
            {new Intl.DateTimeFormat('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }).format(fecha)},{' '}
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
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    };
  }
  
  toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
      valoracion: 5
    });
  }    

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    });
  }
  
  gestionarComentario() {
    const { excursionId } = this.props.route.params;
  
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );
  
    this.resetForm();
  }
  
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;
    const excursion = EXCURSIONES[+excursionId];
    const comentariosFiltrados = this.props.comentarios.comentarios.filter(
      comentario => comentario.excursionId === excursionId
    );    
    
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          toggleModal={() => this.toggleModal()}
        />
        <RenderComentario comentarios={comentariosFiltrados} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}
        >
          <ScrollView contentContainerStyle={{ paddingTop: 60 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Rating
                  showRating
                  type="star"
                  imageSize={40}
                  fractions={0}  
                  startingValue={5}           
                  onFinishRating={(valor) => this.setState({ valoracion: valor })}
                />
              </View>
              <Input
                placeholder="Autor"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(autor) => this.setState({ autor })}
                value={this.state.autor}
              />
              <Input
                placeholder="Comentario"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={(comentario) => this.setState({ comentario })}
                value={this.state.comentario}
              />
              <Button
                title="ENVIAR"
                onPress={() => this.gestionarComentario()}
                type="clear"
                titleStyle={{ color: colorGaztaroaOscuro }}
              />
              <Button
                title="CANCELAR"
                onPress={() => this.resetForm()}
                type="clear"
                titleStyle={{ color: colorGaztaroaOscuro }}
              />
            </View>
          </ScrollView>
        </Modal>

      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  };
};

const mapDispatchToProps = dispatch => ({ 
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)), 
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
