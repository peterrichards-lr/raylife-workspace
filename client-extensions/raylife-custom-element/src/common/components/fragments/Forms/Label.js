/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import classNames from 'classnames';
import React from 'react';

export function Label({children, className, label, name, required = false}) {
	return (
		<label className="align-items-center" htmlFor={name}>
			<div
				className={classNames(
					'd-inline-block font-weight-bolder h6',
					className,
					{required}
				)}
			>
				{label}
			</div>

			{children}
		</label>
	);
}
