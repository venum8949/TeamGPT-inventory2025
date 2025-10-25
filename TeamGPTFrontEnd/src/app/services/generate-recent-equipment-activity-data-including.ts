import { EquipmentActivityType } from '../models/GenerateRecentEquipmentActivityDataIncluding/equipment-activity-type';

export async function getEquipmentActivity(accesstoken: string): Promise<EquipmentActivityType[]> {
  const response = await fetch('../../static-data/generate-recent-equipment-activity-data-including-equipment-activity-type.json');
  if (!response.ok) {
    return Promise.resolve([]);
  }
  return response.json();
}
