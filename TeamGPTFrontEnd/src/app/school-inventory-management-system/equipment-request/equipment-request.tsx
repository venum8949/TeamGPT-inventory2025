import { IgrButton, IgrCombo, IgrRipple, IgrSnackbar, IgrTextarea } from '@infragistics/igniteui-react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { formDataToObject } from '../../utils/form-utils';
import { postRequest } from '../../services/team-gptinventory';
import { RequestDto } from '../../models/TeamGPTInventory/request-dto';
import { useGetEquipmentList } from '../../hooks/team-gptinventory-hooks';
import styles from './equipment-request.module.css';
import createClassTransformer from '../../style-utils';
import '/src/app/base-view-styles.css';

export default function EquipmentRequest() {
  const classes = createClassTransformer(styles);
  let initialRequests: RequestDto | undefined;
  const routeParams = useParams();
  const equipmentID = routeParams.EquipmentID != null
    ? Number(routeParams.EquipmentID)
    : undefined;
  const form = useRef<HTMLFormElement>(null);
  const snackbarsuccess = useRef<IgrSnackbar>(null);
  const snackbarerror = useRef<IgrSnackbar>(null);
  const { teamGPTInventoryEquipment: gear } = useGetEquipmentList();

  async function submitRequestDto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = formDataToObject<RequestDto>(e.target as HTMLFormElement);
   
    try {
      const response = await postRequest(value);
      console.log('Отговор от backend:', response);

      if (response) {
        snackbarsuccess.current?.show(); // показва snackbar за успех
      } else {
        snackbarerror.current?.show(); // показва snackbar за грешка
      }
    } catch (error) {
      console.error('Грешка при заявката:', error);
      snackbarerror.current?.show(); // показва snackbar при изключение
    }
  }

  return (
    <>
      <div className={classes("column-layout equipment-request-container")}>
        <div className={classes("column-layout request-form-layout")}>
          <h3 className={classes("content")}>
            <span>Request Equipment</span>
          </h3>
          <p className={classes("typography__body-1 content")}>
            <span>Fill out the form below to borrow equipment.</span>
          </p>
          <form onSubmit={submitRequestDto} ref={form} className={classes("column-layout form")}>
            <div className={classes("column-layout form_fields")}>
              <IgrCombo outlined={true} data={gear} label="Equipment" defaultValue={equipmentID ? [equipmentID] : []} valueKey="equipmentId" displayKey="name" singleSelect={true} name="equipmentId" className={classes("user-input")}></IgrCombo>
              <IgrTextarea label="Comment" required={true} defaultValue={initialRequests?.note ?? ""} outlined={true} name="note" className={classes("user-input")}></IgrTextarea>
            </div>
            <div className={classes("row-layout actions")}>
              <IgrButton variant="outlined" type="reset" className={classes("button")}>
                <span>Reset</span>
                <IgrRipple></IgrRipple>
              </IgrButton>
              <IgrButton type="submit" className={classes("button")}>
                <span>Send</span>
                <IgrRipple></IgrRipple>
              </IgrButton>
            </div>
            <IgrSnackbar actionText="OK" onAction={() => snackbarsuccess?.current?.toggle()} ref={snackbarsuccess}>
              <span>Your new submission was saved successfully!</span>
            </IgrSnackbar>
            <IgrSnackbar actionText="OK" onAction={() => snackbarerror?.current?.toggle()} ref={snackbarerror}>
              <span>Uh-oh! Something went wrong.</span>
            </IgrSnackbar>
          </form>
        </div>
      </div>
    </>
  );
}
