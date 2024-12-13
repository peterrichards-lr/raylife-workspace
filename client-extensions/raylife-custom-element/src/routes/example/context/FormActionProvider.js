/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {createContext, useContext, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import useFormActions from '../hooks/useFormActions';
import {AppContext} from './AppContextProvider';

export const FormActionContext = createContext();

const FormActionProvider = ({children, form}) => {
	const {
		formState: {errors, isValid},
	} = useFormContext();

	const [loading, setLoading] = useState(false);

	const {
		state: {
			activeMobileSubSection,
			dimensions: {
				device: {isMobile},
			},
			selectedStep: {index: currentStepIndex = 0},
			steps,
		},
	} = useContext(AppContext);

	const {onNext, onPrevious, onSave} = useFormActions({
		form,
		nextSection: steps[currentStepIndex + 1],
		previousSection: steps[currentStepIndex - 1]
	});

	const isContinueButtonVisible = () => {
		if (!isMobile) {
			return true;
		}

		return activeMobileSubSection?.hideContinueButton ? false : true;
	};

	return (
		<FormActionContext.Provider
			value={{
				actionProps: {
					onNext,
					onPrevious,
					showContinueButton: isContinueButtonVisible()
				},
				isMobileDevice: isMobile,
				isValid,
			}}
		>
			{children}
		</FormActionContext.Provider>
	);
};

export default FormActionProvider;
