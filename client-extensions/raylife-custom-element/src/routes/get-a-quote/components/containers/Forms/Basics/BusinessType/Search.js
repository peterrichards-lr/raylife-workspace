/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {WarningBadge} from '../../../../../../../common/components/fragments/Badges/Warning';
import {MoreInfoButton} from '../../../../../../../common/components/fragments/Buttons/MoreInfo';
import {SearchInput} from '../../../../../../../common/components/fragments/Forms/Input/Search';
import {useDebounce} from '../../../../../../../common/hooks/useDebounce';
import {calculatePercentage} from '../../../../../../../common/utils';
import {TIP_EVENT} from '../../../../../../../common/utils/events';
import {useStepWizard} from '../../../../../hooks/useStepWizard';
import {useTriggerContext} from '../../../../../hooks/useTriggerContext';
import {getTaxonomyCategories} from '../../../../../services/TaxonomyVolucabularies';
import {AVAILABLE_STEPS, TOTAL_OF_FIELD} from '../../../../../utils/constants';
import {getLoadedContentFlag, truncateSearch} from '../../../../../utils/util';
import BusinessTypeRadioGroup from './BusinessTypeRadioGroup';
import {useTranslation} from 'react-i18next';

const templateName = 'i-am-unable-to-find-my-industry';

const MAX_LENGTH_TO_TRUNCATE = 18;

export function BusinessTypeSearch({
	form,
	isMobileDevice = false,
	setNewSelectedProduct,
	taxonomyVocabularyId,
}) {
	const [taxonomyCategories, setTaxonomyCategories] = useState([]);
	const [error, setError] = useState();
	const {register, setValue} = useFormContext();
	const {isSelected, updateState} = useTriggerContext();

	const {setPercentage} = useStepWizard();
	const [isLoading, setIsLoading] = useState(false);
	const {applicationId, backToEdit} = getLoadedContentFlag();

	const {t} = useTranslation();

	const businessSearchDebounced = useDebounce(
		form?.basics?.businessSearch,
		500
	);

	const _getTaxonomyCategories = async (search = '') => {
		if (!search) {
			return setTaxonomyCategories([]);
		}

		try {
			const taxonomyCategoriesResponse = await getTaxonomyCategories(
				taxonomyVocabularyId,
				search
			);

			const taxonomyCategories =
				taxonomyCategoriesResponse.data.items || [];

			setError('');

			setTaxonomyCategories(taxonomyCategories);
		}
		catch (error) {
			setError(t('get-taxonomy-error'));
		}
	};

	const getTaxonomyCategoriesBySearchName = async (searchTerm) => {
		setIsLoading(true);

		if (!searchTerm) {
			if (applicationId || backToEdit) {
				setPercentage(
					calculatePercentage(
						TOTAL_OF_FIELD.BASICS - 1,
						TOTAL_OF_FIELD.BASICS
					),
					AVAILABLE_STEPS.BASICS_BUSINESS_TYPE.section
				);
			}

			setValue('basics.businessCategoryId', '');
			setValue('basics.properties.businessClassCode', '');
			setValue('basics.properties.naics', '');
			setValue('basics.properties.segment', '');
		}

		await _getTaxonomyCategories(searchTerm);

		setIsLoading(false);
	};

	useEffect(() => {
		getTaxonomyCategoriesBySearchName(businessSearchDebounced);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [businessSearchDebounced]);

	const noResults =
		!taxonomyCategories.length && !isLoading && businessSearchDebounced;

	return (
		<>
			<div className="mb-5">
				<SearchInput
					className={classNames(
						'bg-neutral-1 font-weight-bold px-4 py-0 search text-neutral-10 text-paragraph-lg',
						{'pr-7': isMobileDevice}
					)}
					defaultValue=""
					isMobileDevice={isMobileDevice}
					label={t('business-search-label')}
					placeholder={t('business-search-placeholder')}
					required
					{...register('basics.businessSearch', {
						required:
							t('business-search-type-required'),
					})}
				>
					{!isMobileDevice && (
						<ClayButton
							className="font-weight-bolder ml-3 search text-paragraph text-small-caps"
							displayType="primary"
						>
							{t('search')}
						</ClayButton>
					)}
				</SearchInput>

				<p className="mt-1 paragraph">
					{t('business-search-hint')}
				</p>
			</div>

			<BusinessTypeRadioGroup
				businessTypes={taxonomyCategories}
				form={form}
				setNewSelectedProduct={setNewSelectedProduct}
			/>

			{noResults && (
				<WarningBadge>
					{t('no-results-prefix')} &quot;
					{truncateSearch(
						form?.basics?.businessSearch,
						MAX_LENGTH_TO_TRUNCATE
					)}
					&quot;{t('no-result-suffix')}
				</WarningBadge>
			)}

			{error && <WarningBadge>{error}</WarningBadge>}

			{businessSearchDebounced && !isLoading && (
				<MoreInfoButton
					callback={() => updateState(templateName)}
					event={TIP_EVENT}
					label={t('unable-to-find-industry')}
					selected={isSelected(templateName)}
					value={{templateName}}
				/>
			)}
		</>
	);
}
