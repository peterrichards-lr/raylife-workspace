import {STORAGE_KEYS, Storage} from '../../../common/services/liferay/storage';

export function getExampleIdSearchParam() {
	const searchParams = new URLSearchParams(window.location.search);
	const exampleId = searchParams.get('exampleId');

	return exampleId;
}

export function getLoadedContentFlag() {
	return {
		exampleId: getExampleIdSearchParam(),
		backToEdit:
			Storage.getItem(STORAGE_KEYS.BACK_TO_EDIT) &&
			JSON.parse(Storage.getItem(STORAGE_KEYS.BACK_TO_EDIT)),
	};
}