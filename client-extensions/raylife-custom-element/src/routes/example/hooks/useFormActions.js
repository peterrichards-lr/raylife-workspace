/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useContext} from 'react';
import {STORAGE_KEYS, Storage} from '../../../common/services/liferay/storage';
import {clearExitAlert} from '../../../common/utils/exitAlert';
import {AppContext} from '../context/AppContextProvider';
import useFormActionsDefault from './useFormActionsDefault';
import useFormActionsMobile from './useFormActionsMobile';

const redirectToHomePage = () => {
	clearExitAlert();

	Storage.removeItem(STORAGE_KEYS.BACK_TO_EDIT);
};

const useFormActions = (params) => {
	const {
		state: {
			dimensions: {
				device: {isMobile},
			},
			selectedStep: {index: currentStepIndex = 0},
		},
	} = useContext(AppContext);

	const formActionsDefault = useFormActionsDefault(params);
	const formActionsMobile = useFormActionsMobile(
		formActionsDefault,
		redirectToHomePage
	);

	if (isMobile) {
		return formActionsMobile;
	}

	return {
		...formActionsDefault,
		onPrevious: () => {
			if (currentStepIndex !== 0) {
				return formActionsDefault.onPrevious();
			}

			redirectToHomePage();
		},
	};
};

export default useFormActions;
