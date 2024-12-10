/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React, {useContext, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {NumberControlledInput} from '../../../../../common/components/connectors/Controlled/Input/Number';
import {PercentageControlledInput} from '../../../../../common/components/connectors/Controlled/Input/WithMask/Percentage';
import {LegalEntityControlledSelect} from '../../../../../common/components/connectors/Controlled/Select/LegalEntity';
import {ControlledSwitch} from '../../../../../common/components/connectors/Controlled/Switch';
import {TIP_EVENT} from '../../../../../common/utils/events';
import {PERCENTAGE_REGEX_MAX_100} from '../../../../../common/utils/patterns';
import {ActionTypes, AppContext} from '../../../context/AppContextProvider';
import useMobileContainer from '../../../hooks/useMobileContainer';
import {useTriggerContext} from '../../../hooks/useTriggerContext';
import {
	validateOverallSales,
	validateOwnBrandLabel,
	validatePercentSales,
} from '../../../utils/businessFields';
import {SUBSECTION_KEYS} from '../../../utils/constants';
import MobileContainer from '../../mobile/MobileContainer';
import {useTranslation} from 'react-i18next';

const setFormPath = (value) => `business.${value}`;

export function FormBusiness({form}) {
	const {isSelected, updateState} = useTriggerContext();
	const {control, getValues, setValue} = useFormContext();

	const {dispatch} = useContext(AppContext);

	const properties = form?.basics?.properties;
	const {getMobileSubSection, mobileContainerProps, nextStep} =
		useMobileContainer();

	const {t} = useTranslation();

	const forceValidation = () => {
		setValue(
			setFormPath('hasAutoPolicy'),
			getValues(setFormPath('hasAutoPolicy')),
			{shouldValidate: true}
		);
	};

	useEffect(() => {
		forceValidation();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	/**
	 * @description useEffect used to disable some mobileSubSections
	 */

	useEffect(() => {
		const getPropertyNameIfNotValid = (isValid, propertyName) =>
			isValid ? '' : propertyName;

		dispatch({
			payload: [
				getPropertyNameIfNotValid(
					validatePercentSales(properties?.naics),
					SUBSECTION_KEYS.PERCENT_OF_SALES_FROM_MERCHANDISE
				),
				getPropertyNameIfNotValid(
					validateOwnBrandLabel(properties?.naics),
					SUBSECTION_KEYS.DO_YOU_SELL_PRODUCTS_UNDER_OWN_BRAND
				),
				getPropertyNameIfNotValid(
					validateOverallSales(properties?.segment),
					SUBSECTION_KEYS.WHAT_PERCENTAGE_OF_OVERALL_INVOLVE_DELIVERY
				),
			].filter(Boolean),
			type: ActionTypes.SET_MOBILE_SUBSECTION_DISABLE,
		});
	}, [dispatch, properties]);

	return (
		<div className="card-content">
			<MobileContainer
				{...mobileContainerProps}
				mobileSubSection={getMobileSubSection(
					SUBSECTION_KEYS.YEAR_OF_INDUSTRY_EXPERIENCE
				)}
			>
				<NumberControlledInput
					control={control}
					label={SUBSECTION_KEYS.YEAR_OF_INDUSTRY_EXPERIENCE}
					moreInfoProps={{
						callback: () =>
							updateState(setFormPath('yearsOfExperience')),
						event: TIP_EVENT,
						selected: isSelected(setFormPath('yearsOfExperience')),
						value: {
							inputName: setFormPath('yearsOfExperience'),
							templateName: 'years-of-industry-experience',
							value: form?.business?.yearsOfExperience,
						},
					}}
					name={setFormPath('yearsOfExperience')}
					rules={{
						min: {
							message: t('positive-integer'),
							value: 0,
						},
						required: t('field-required'),
					}}
				/>
			</MobileContainer>

			<MobileContainer
				{...mobileContainerProps}
				mobileSubSection={getMobileSubSection(
					SUBSECTION_KEYS.DO_YOU_STORE_PERSONALITY_IDENTIFIABLE
				)}
			>
				<ControlledSwitch
					control={control}
					label={
						SUBSECTION_KEYS.DO_YOU_STORE_PERSONALITY_IDENTIFIABLE
					}
					name={setFormPath('hasStoredCustomerInformation')}
					onSelect={nextStep}
					rules={{required: true}}
				/>
			</MobileContainer>

			<MobileContainer
				{...mobileContainerProps}
				mobileSubSection={getMobileSubSection(
					SUBSECTION_KEYS.DO_YOU_HAVE_RAYLIFE_POLICY
				)}
			>
				<ControlledSwitch
					control={control}
					label={SUBSECTION_KEYS.DO_YOU_HAVE_RAYLIFE_POLICY}
					name={setFormPath('hasAutoPolicy')}
					onSelect={nextStep}
					rules={{required: true}}
				/>
			</MobileContainer>

			<MobileContainer
				{...mobileContainerProps}
				mobileSubSection={getMobileSubSection(
					SUBSECTION_KEYS.LEGAL_ENTITY
				)}
			>
				<LegalEntityControlledSelect
					control={control}
					inputProps={{className: 'mb-5'}}
					label={SUBSECTION_KEYS.LEGAL_ENTITY}
					name={setFormPath('legalEntity')}
					rules={{
						required: t('field-required'),
					}}
				/>
			</MobileContainer>

			{validatePercentSales(form?.basics?.properties?.naics) && (
				<MobileContainer
					{...mobileContainerProps}
					mobileSubSection={getMobileSubSection(
						SUBSECTION_KEYS.PERCENT_OF_SALES_FROM_MERCHANDISE
					)}
				>
					<PercentageControlledInput
						control={control}
						label={
							SUBSECTION_KEYS.PERCENT_OF_SALES_FROM_MERCHANDISE
						}
						moreInfoProps={{
							callback: () =>
								updateState(setFormPath('salesMerchandise')),
							event: TIP_EVENT,
							selected: isSelected(
								setFormPath('salesMerchandise')
							),
							value: {
								inputName: setFormPath('salesMerchandise'),
								templateName:
									'percent-of-sales-from-used-merchandise',
								value: form?.business?.salesMerchandise,
							},
						}}
						name={setFormPath('salesMerchandise')}
						rules={{
							pattern: {
								message: t('max-percentage-validation'),
								value: PERCENTAGE_REGEX_MAX_100,
							},
							required: t('sales-percentage-required'),
						}}
					/>
				</MobileContainer>
			)}

			{validateOwnBrandLabel(form?.basics?.properties?.naics) && (
				<MobileContainer
					{...mobileContainerProps}
					mobileSubSection={getMobileSubSection(
						SUBSECTION_KEYS.DO_YOU_SELL_PRODUCTS_UNDER_OWN_BRAND
					)}
				>
					<ControlledSwitch
						control={control}
						label={
							SUBSECTION_KEYS.DO_YOU_SELL_PRODUCTS_UNDER_OWN_BRAND
						}
						name={setFormPath('hasSellProductsUnderOwnBrand')}
						onSelect={nextStep}
						rules={{required: true}}
					/>
				</MobileContainer>
			)}

			{validateOverallSales(form?.basics?.properties?.segment) && (
				<MobileContainer
					{...mobileContainerProps}
					mobileSubSection={getMobileSubSection(
						SUBSECTION_KEYS.WHAT_PERCENTAGE_OF_OVERALL_INVOLVE_DELIVERY
					)}
				>
					<PercentageControlledInput
						control={control}
						label={
							SUBSECTION_KEYS.WHAT_PERCENTAGE_OF_OVERALL_INVOLVE_DELIVERY
						}
						name={setFormPath('overallSales')}
						rules={{
							pattern: {
								message: t('max-percentage-validation'),
								value: PERCENTAGE_REGEX_MAX_100,
							},
							required: t('overall-sales=percentage-required'),
						}}
					/>
				</MobileContainer>
			)}
		</div>
	);
}
