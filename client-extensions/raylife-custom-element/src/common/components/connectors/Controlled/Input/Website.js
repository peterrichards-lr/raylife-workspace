/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from 'react';
import {ControlledInput} from '.';
import {useTranslation} from 'react-i18next';

import {WEBSITE_REGEX} from '../../../../utils/patterns';

export function WebsiteControlledInput({rules, ...props}) {
	const {t} = useTranslation();

	return (
		<ControlledInput
			{...props}
			inputProps={{
				className: 'd-flex mb-5 mr-0',
			}}
			rules={{
				pattern: {
					message: t('website-validation'),
					value: WEBSITE_REGEX,
				},
				...rules,
			}}
		/>
	);
}
