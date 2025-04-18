import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux'; 
import { baseUrl } from '../comun/comun';
import { IndicadorActividad } from './IndicadorActividadComponent';

class Calendario extends Component {
  render() {
    const { navigate } = this.props.navigation;

    const renderCalendarioItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
          bottomDivider
        >
          <Avatar source={{ uri: baseUrl + item.imagen }} />
          <ListItem.Content>
            <ListItem.Title>{item.nombre}</ListItem.Title>
            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    // Mostrar loader o error
    if (this.props.excursiones.isLoading) {
      return <IndicadorActividad />;
    }

    if (this.props.excursiones.errMess) {
      return <Text style={{ margin: 20 }}>{this.props.excursiones.errMess}</Text>;
    }

    return (
      <SafeAreaView>
        <FlatList
          data={this.props.excursiones.excursiones} 
          renderItem={renderCalendarioItem}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones
  };
};

export default connect(mapStateToProps)(Calendario);
