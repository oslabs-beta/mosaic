import {Button} from 'antd';
import csx from 'classnames';
import {ReactComponent as Icon} from './google_signin_button.svg';
import styles from './googleSignInButton.module.css';

const GoogleSignInButton = () => {
  return (
    <Button type="primary" className={csx(styles.btn, styles['btn-google'])}>
      <a href="/auth/google">
        <div className={csx(styles['btn-content'], 'google-btn')}>
          <Icon />
        </div>
      </a>
    </Button>
  );
};

export {GoogleSignInButton};
