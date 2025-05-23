import React, { Component } from 'react';
import { FlatList, Text, ScrollView } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { connect } from 'react-redux'; 
import { baseUrl } from '../comun/comun';
import { IndicadorActividad } from './IndicadorActividadComponent';

// Componente funcional: historia del club
function Historia() {
  return (
    <Card>
      <Card.Title style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
        Un poquito de historia
      </Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10, lineHeight: 20 }}>
        El nacimiento del club de montaña Gaztaroa se remonta a la 
        primavera de 1976 cuando jóvenes aficionados a la montaña y 
        pertenecientes a un club juvenil decidieron crear la sección 
        montañera de dicho club. Fueron unos comienzos duros debido 
        sobre todo a la situación política de entonces. Gracias al 
        esfuerzo económico de sus socios y socias se logró alquilar 
        una bajera. Gaztaroa ya tenía su sede social.{'\n\n'}
        Desde aquí queremos hacer llegar nuestro agradecimiento a 
        todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.{'\n\n'}
        Gracias!
      </Text>
    </Card>
  );
}

// Componente de clase: lista de actividades
class QuienesSomos extends Component {
  render() {
    const renderActividadItem = ({ item, index }) => (
      <ListItem key={index} bottomDivider>
        <Avatar source={{ uri: baseUrl + item.imagen }} />
        <ListItem.Content>
          <ListItem.Title style={{ color: 'black' }}>{item.nombre}</ListItem.Title>
          <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );

    if (this.props.actividades.isLoading) {
      return (
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
              "Actividades y recursos"
            </Card.Title>
            <Card.Divider />
            <IndicadorActividad />
          </Card>
        </ScrollView>
      );
    }

    if (this.props.actividades.errMess) {
      return (
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
              "Actividades y recursos"
            </Card.Title>
            <Card.Divider />
            <Text>{this.props.actividades.errMess}</Text>
          </Card>
        </ScrollView>
      );
    }

    return (
      <ScrollView>
        <Historia />
        <Card>
          <Card.Title style={{ color: 'black', fontSize: 20, textAlign: 'center' }}>
            "Actividades y recursos"
          </Card.Title>
          <Card.Divider />
          <FlatList
            data={this.props.actividades.actividades} 
            renderItem={renderActividadItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    actividades: state.actividades
  };
};

export default connect(mapStateToProps)(QuienesSomos);
