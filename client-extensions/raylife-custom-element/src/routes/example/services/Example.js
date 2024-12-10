/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {LiferayAdapt} from '../../../common/services/liferay/adapter';
import {axios} from '../../../common/services/liferay/api';
import {getGuestPermissionToken} from '../../../common/services/token';
import {Liferay} from '../../../common/utils/liferay';

const ExampleAPI = 'o/c/examples';

export function getExampleById(raylifeApplicationId) {
	return axios.get(`${ExampleAPI}/${raylifeApplicationId}`);
}

/**
 * @param {DataForm}  form Basics form object
 * @returns {Promise<any>}  Status code
 */

const updateExample = async (exampleId, payload = null) => {
	if (Liferay.ThemeDisplay.getUserName()) {
		return axios.patch(
			`${ExampleAPI}/${exampleId}`,
			payload
		);
	}

	const {access_token} = await getGuestPermissionToken();

	Liferay.Util.SessionStorage.setItem(
		'raylife-guest-permission-token',
		access_token,
		Liferay.Util.SessionStorage.TYPES.NECESSARY
	);

	return axios.patch(`${ExampleAPI}/${exampleId}`, payload, {
		headers: {
			'Authorization': `Bearer ${access_token}`,
			'Content-Type': 'application/json',
		},
	});
};

export function createOrUpdateExample(form, status) {
	const payload = LiferayAdapt.adaptToFormApplicationRequest(form, status);
	const exampleId = form?.basics?.applicationId;

	if (exampleId) {
		return updateExample(exampleId, payload);
	}

	return axios.post(`${ExampleAPI}/`, payload).catch((error) => {
		console.error(error);
	});
}