import './tempPolyfill'; // TODO: Remove this polyfill once this raf issue is fixed http://fb.me/react-polyfills
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
