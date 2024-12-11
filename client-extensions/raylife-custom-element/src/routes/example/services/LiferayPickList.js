import { axios } from '../../../common/services/liferay/api';
import {getGuestPermissionToken} from '../../../common/services/token';
import {Liferay} from '../../../common/utils/liferay';

import { PICK_LISTS } from '../utils/constants';

const headlessAPI =
  'o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/';

export async function getPickListEntries(pickListERC) {
  if (Liferay.ThemeDisplay.getUserName()) {
    return axios.get(`${headlessAPI}${pickListERC}/list-type-entries?page=0`).then((response) => response?.data?.items);
  }

  const { access_token } = await getGuestPermissionToken();

  return axios.get(`${headlessAPI}${pickListERC}/list-type-entries?page=0`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  }).then((response) => response?.data?.items);
}

const adaptToSelect = (data) => {
   return {
      key: data.externalReferenceCode,
      name: data.key,
      value: data.name
   }
}

export async function getCounties() {
  const response = await getPickListEntries(PICK_LISTS.UK_COUNTIES);
  return response.map((data) => adaptToSelect(data));
}

export async function getSalutations() {
  const response = await  getPickListEntries(PICK_LISTS.UK_SALUTATIONS);
  return response.map((data) => adaptToSelect(data));
}
