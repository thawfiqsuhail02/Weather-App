import * as React from 'react';
import { Appbar,Title} from 'react-native-paper';

const headers=(props)=> {
    return (
      <Appbar.Header theme={{colors:{primary:"#00aaff"}}} style={{justifyContent:"center"}}>
        <Title style={{color:"white"}}>{props.name}</Title>
      </Appbar.Header>
    );
}

export default headers