import {Button} from 'antd';
import axios from 'axios';
import csx from 'classnames';
import {ReactComponent as Icon} from './google_signin_button.svg';
import styles from './googleSignInButton.module.css';

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };
    await axios.get('http://localhost:8080/auth/google', config);
  };

  return (
    <Button type="primary" className={csx(styles.btn, styles['btn-google'])} onClick={handleSignIn}>
      <div className={csx(styles['btn-content'], 'google-btn')}>
        <Icon />
      </div>
    </Button>
  );
};

export {GoogleSignInButton};
