import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('main', () => App);
if (typeof document !== 'undefined') {
  AppRegistry.runApplication('main', {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
}
