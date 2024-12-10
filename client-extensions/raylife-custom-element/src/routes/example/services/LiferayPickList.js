import {axios} from '../../../common/services/liferay/api';
import { PICK_LISTS } from "../utils/constants";

const headlessAPI = 'o/headless-admin-list-type/v1.0/list-type-definitions/by-external-reference-code/';

export async function getPickListEntries(pickListERC) {

   const {data} = await axios.get(
		`${headlessAPI}}${pickListERC}/list-type-entries?page=0`
	);
   return data.items;
}


export async function getCounties() {

   return await getPickListEntries(PICK_LISTS.UK_COUNTIES);

}

export async function getSalutations() {

   return await getPickListEntries(PICK_LISTS.UK_SALUTATIONS);

}
