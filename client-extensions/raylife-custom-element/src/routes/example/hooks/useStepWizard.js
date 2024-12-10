/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useContext, useEffect} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';
import {calculatePercentage, countCompletedFields} from '../../../common/utils';

import {ActionTypes, AppContext} from '../context/AppContextProvider';
import {AVAILABLE_STEPS, TOTAL_OF_FIELD} from '../utils/constants';

export function useStepWizard() {
	const form = useWatch();
	const {dispatch, state} = useContext(AppContext);
	const currentPercentage = state.percentage;
	const selectedStep = state.steps.find(({active}) => active);

	const dispatchPercentage = (payload) => {
		dispatch({
			payload,
			type: ActionTypes.SET_PERCENTAGE,
		});
	};

	const {
		control: {_fields},
	} = useFormContext();

	useEffect(() => {
		_updateStepPercentage();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form]);

	useEffect(() => {
		calculateAllSteps();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const calculateAllSteps = () => {
		const formKeys = Object.keys(form).filter(
			(section) => section !== 'raylife-form-input'
		);
		const stepName = formKeys[formKeys.length - 1]?.toLowerCase();

		switch (stepName) {
			case AVAILABLE_STEPS.PERSONAL.section:
				setAllPercentages({
					personal: 100
				});
				break;
			case AVAILABLE_STEPS.ADDRESS.section:
				setAllPercentages({
					personal: 100,
					address: 100
				});
				break;
			case AVAILABLE_STEPS.TERMS.section:
				setAllPercentages({
					personal: 100,
					address: 100,
					terms: 100,
				});
				break;
			default:
				break;
		}
	};

	const _updateStepPercentage = () => {
		switch (selectedStep.section) {
			case AVAILABLE_STEPS.PERSONAL.section: {
				let total = TOTAL_OF_FIELD.PERSONAL;
				return setPercentage(
					calculatePercentage(
						countCompletedFields(_fields?.personal || {}),
						total
					),
					AVAILABLE_STEPS.PERSONAL.section
				);
			}

			case AVAILABLE_STEPS.ADDRESS.section: {
				let total = TOTAL_OF_FIELD.ADDRESS;

				return setPercentage(
					calculatePercentage(
						countCompletedFields(_fields?.address || {}),
						total
					),
					AVAILABLE_STEPS.ADDRESS.section
				);
			}

			case AVAILABLE_STEPS.TERMS.section: {
				let total = TOTAL_OF_FIELD.TERMS;
				return setPercentage(
					calculatePercentage(
						countCompletedFields(_fields?.terms || {}),
						total
					),
					AVAILABLE_STEPS.TERMS.section
				);
			}

			default:
				return setPercentage(
					0,
					AVAILABLE_STEPS.PERSONAL.section
				);
		}
	};

	const setSection = (step) => {
		dispatch({
			payload: step,
			type: ActionTypes.SET_STEP_ACTIVE,
		});
	};

	const setPercentage = (
		percentage = 0,
		step = AVAILABLE_STEPS.PERSONAL.section
	) => {
		dispatchPercentage({
			...currentPercentage,
			[step]: percentage,
		});
	};

	const setAllPercentages = (
		step = {personal: 0, address: 0, terms: 0}
	) => {
		dispatchPercentage({
			...currentPercentage,
			...step,
		});
	};

	return {
		selectedStep,
		setPercentage,
		setSection,
	};
}
