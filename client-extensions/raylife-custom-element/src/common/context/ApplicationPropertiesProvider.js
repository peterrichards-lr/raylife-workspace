/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {createContext} from 'react';
import { APPLICATION_FOLDER_NAME } from '../utils/constants';

const defaultProperties = {
	applicationsfoldername: APPLICATION_FOLDER_NAME,
	googleplaceskey: '',
	route: '',
};

export const ApplicationPropertiesContext = createContext(defaultProperties);

/**
 * @description The Context contains all properties settled on Web Component
 * @param {Object} Props -> Contains object with Properties of Application
 * Inserted from index.html properties for Web Component
 */

const ApplicationContextProvider = ({children, properties}) => (
	<ApplicationPropertiesContext.Provider value={properties}>
		{children}
	</ApplicationPropertiesContext.Provider>
);

export default ApplicationContextProvider;
