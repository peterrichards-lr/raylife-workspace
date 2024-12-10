/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
import i18next from '../../../i18n';

const toBool = (value) =>
  value && value !== undefined && value !== null && value === 'true';

export function verifyInputAgentPage(properties, nextSection) {
  const auxBusiness = properties?.business?.hasSellProductsUnderOwnBrand;
  const auxEmployees = properties?.employees?.hasFein;
  const auxProperty = properties?.property?.isThereDivingBoards;
  let contextualMessage = '';

  if (toBool(auxBusiness) && nextSection?.section === 'employees') {
    contextualMessage = i18next.t('more-questions-business');
  } else if (!toBool(auxEmployees) && nextSection?.section === 'property') {
    contextualMessage = i18next.t('more-questions-employees');
  } else if (toBool(auxProperty)) {
    contextualMessage = i18next.t('more-questions-property');
  }

  return contextualMessage;
}
