import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const TabBarIcon = type => name => size => ({ tintColor }) => {
  typeHelper = () => {
    const iconType = type;
    if (iconType == 'FontAwesome5Icon') {
      return <FontAwesome5Icon name={name} size={size} color={tintColor} />;
    } else if (type == 'MaterialCommunityIcon') {
      return (
        <MaterialCommunityIcon name={name} size={size} color={tintColor} />
      );
    } else if (type == 'FontAwesome') {
      return <FontAwesome name={name} size={size} color={tintColor} />;
    }
  };
  return <React.Fragment>{typeHelper()}</React.Fragment>;
};

export default TabBarIcon;
