import { useCallback, useEffect, useState } from 'react';
import { EquipmentActivityType } from '../models/GenerateRecentEquipmentActivityDataIncluding/equipment-activity-type';
import { getEquipmentActivity } from '../services/generate-recent-equipment-activity-data-including';

export const useGetEquipmentActivity = (accesstoken:string) => {
  const [equipmentActivity, setEquipmentActivity] = useState<EquipmentActivityType[]>([]);

  const requestEquipmentActivity = useCallback(() => {
    let ignore = false;
    getEquipmentActivity(accesstoken)
      .then((data) => {
        if (!ignore) {
          setEquipmentActivity(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestEquipmentActivity();
  }, [requestEquipmentActivity]);

  return { requestGenerateRecentEquipmentActivityDataIncludingEquipmentActivity: requestEquipmentActivity, generateRecentEquipmentActivityDataIncludingEquipmentActivity: equipmentActivity, setGenerateRecentEquipmentActivityDataIncludingEquipmentActivity: setEquipmentActivity };
}
