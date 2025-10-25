import { IgrButton, IgrInput, IgrRipple, IgrSnackbar } from '@infragistics/igniteui-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { formDataToObject } from '../utils/form-utils';
import { postRegisterResponse } from '../services/team-gptinventory';
import { RegisterRequest } from '../models/TeamGPTInventory/register-request';
import styles from './register-view.module.css';
import createClassTransformer from '../style-utils';
import '/src/app/base-view-styles.css';

export default function RegisterView() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const snackbar = useRef<IgrSnackbar>(null);

  async function submitRegisterRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = formDataToObject<RegisterRequest>(e.target as HTMLFormElement);
    const postRegisterResponseResult =  await postRegisterResponse(value);
    if (postRegisterResponseResult) {
      navigate('/login-view');
    } else {
      snackbar.current?.toggle();
    }
  }

  return (
    <>
      <div className={classes("row-layout register-view-container")}>
        <div className={classes("column-layout group")}>
          <form onSubmit={submitRegisterRequest} ref={form} className={classes("column-layout form")}>
            <h6 className={classes("add_apiauthregister")}>
              <span>Register</span>
            </h6>
            <div className={classes("column-layout form_fields")}>
              <IgrInput label="email" outlined={true} name="email"></IgrInput>
              <IgrInput label="password" outlined={true} name="password"></IgrInput>
            </div>
            <div className={classes("row-layout actions")}>
              <IgrButton type="submit" className={classes("button")}>
                <span>sign up</span>
                <IgrRipple></IgrRipple>
              </IgrButton>
            </div>
            <IgrSnackbar actionText="OK">
              <span>Your new submission was saved successfully!</span>
            </IgrSnackbar>
            <IgrSnackbar ref={snackbar} actionText="OK">
              <span>Uh-oh! Something went wrong.</span>
            </IgrSnackbar>
            <div className={classes("row-layout create-account-row")}>
              <p className={classes("typography__body-2 no-account-text")}>
                <span>Already have an account?</span>
              </p>
              <a onClick={() => navigate(`/login-view`)} className={classes("typography__body-2 create-new-account-link")}>
                <span>Sign In</span>
              </a>
            </div>
          </form>
        </div>
        <div className={classes("column-layout group_1")}>
          <img src="/src/assets/ChatGPT%20Image%20Oct%2022%2C%202025%2C%2004_23_43%20PM.png" alt="" className={classes("login-image")} />
        </div>
      </div>
    </>
  );
}
