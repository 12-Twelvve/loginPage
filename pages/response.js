import { useContext} from 'react';
import { Store } from '../utils/Store';

function Response() {
  const {state} = useContext(Store);
  const {userInfo} = state;
  return (
  <div>
      {userInfo?
      <div> successfully logIN</div>:
      <div> login failed</div>
    }
      
  </div>);
}

export default Response;
