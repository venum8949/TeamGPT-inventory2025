import { IgrButton, IgrInput, IgrRipple, IgrSnackbar } from '@infragistics/igniteui-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { formDataToObject } from '../utils/form-utils';
import { LoginRequest } from '../models/TeamGPTInventory/login-request';
import { postLoginResponse } from '../services/team-gptinventory';
import styles from './login-view.module.css';
import createClassTransformer from '../style-utils';
import '/src/app/base-view-styles.css';
import { useGlobalContext } from '../hooks/context-hooks';

export default function LoginView() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const snackbar = useRef<IgrSnackbar>(null);
  const { globalState, setGlobalState } = useGlobalContext();
  
  async function submitLoginRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = formDataToObject<LoginRequest>(e.target as HTMLFormElement);
    const postLoginResponseResult = await postLoginResponse(value);
    if (postLoginResponseResult) {
      setGlobalState({ ...globalState, user: postLoginResponseResult });
      localStorage.setItem('user', JSON.stringify(postLoginResponseResult));
      if (postLoginResponseResult.roles?.includes('Admin')) {
        navigate('/school-inventory-management-system/dashboard');
      } else {
        navigate('/school-inventory-management-system/inventory-catalog');
      }
    } else {
      snackbar.current?.toggle();
    }
  }

  return (
    <>
      <div className={classes("row-layout login-view-container")}>
        <div className={classes("row-layout login-form-container")}>
          <form onSubmit={submitLoginRequest} ref={form} className={classes("column-layout form")}>
            <h6 className={classes("add_apiauthlogin")}>
              <span>Login</span>
            </h6>
            <div className={classes("column-layout form_fields")}>
              <IgrInput label="email" outlined={true} name="email"></IgrInput>
              <IgrInput label="password" outlined={true} name="password" type='password'></IgrInput>
            </div>
            <div className={classes("row-layout actions")}>
              <IgrButton type="submit" className={classes("button")}>
                <span>SIGN IN</span>
                <IgrRipple></IgrRipple>
              </IgrButton>
            </div>
            <div className={classes("row-layout create-account-row")}>
              <p className={classes("typography__body-2 no-account-text")}>
                <span>Don't have an account?</span>
              </p>
              <a onClick={() => navigate(`/register-view`)} className={classes("typography__body-2 create-new-account-link")}>
                <span>Create new account</span>
              </a>
            </div>
            <IgrSnackbar actionText="OK">
              <span>Your new submission was saved successfully!</span>
            </IgrSnackbar>
            <IgrSnackbar ref={snackbar} actionText="OK">
              <span>Uh-oh! Something went wrong.</span>
            </IgrSnackbar>
          </form>
        </div>
        <img src="/src/assets/ChatGPT%20Image%20Oct%2022%2C%202025%2C%2004_23_43%20PM.png" alt="" className={classes("login-image")} />
      </div>
    </>
  );
}
