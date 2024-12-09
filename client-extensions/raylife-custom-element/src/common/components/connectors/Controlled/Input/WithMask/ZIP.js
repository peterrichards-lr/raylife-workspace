/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import React from 'react';
import {ControlledInputWithMask} from '.';
import {useTranslation} from 'react-i18next';

import {ZIP_REGEX} from '../../../../../utils/patterns';

export function ZIPControlledInput({rules = {}, inputProps = {}, ...props}) {
	const {t} = useTranslation();

	return (
		<ControlledInputWithMask
			{...props}
			inputProps={{
				className: 'zip',
				format: '#####',
				mask: '_',
				...inputProps,
			}}
			rules={{
				pattern: {
					message: t('zip-validation'),
					value: ZIP_REGEX,
				},
				...rules,
			}}
		/>
	);
}
