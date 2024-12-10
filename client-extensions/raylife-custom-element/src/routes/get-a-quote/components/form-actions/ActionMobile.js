/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import ClayButton from '@clayui/button';
import React from 'react';

import {useTranslation} from 'react-i18next';

export function ActionMobile({
	onClickSaveAndExit,
	onPrevious,
	onSaveDisabled,
	showSaveAndExit,
}) {
	const {t} = useTranslation();
	return (
		<div className="d-flex justify-content-between mx-0 row">
			{onPrevious && (
				<ClayButton
					className="btn-borderless font-weight-bolder previous text-neutral-0 text-paragraph text-small-caps"
					displayType="style-neutral"
					onClick={onPrevious}
				>
					{t('previous')}
				</ClayButton>
			)}

			<div className="d-flex">
				{showSaveAndExit && (
					<ClayButton
						className="btn btn-ghost btn-inverted font-weight-bolder mr-3 save-exit text-neutral-0 text-paragraph text-small-caps"
						disabled={onSaveDisabled}
						displayType="style-neutral"
						onClick={onClickSaveAndExit}
					>
						{t('save-and-exit')}
					</ClayButton>
				)}
			</div>
		</div>
	);
}
