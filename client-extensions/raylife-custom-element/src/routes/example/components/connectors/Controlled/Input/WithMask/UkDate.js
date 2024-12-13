import React from 'react';
import {ControlledInputWithMask} from '../../../../../../../common/components/connectors/Controlled/Input/WithMask';
import {useTranslation} from 'react-i18next';

import {UK_DATE} from '../../../../../utils/patterns';

export function UkDateControlledInput({rules = {}, inputProps = {}, ...props}) {
	const {t} = useTranslation();

	return (
		<ControlledInputWithMask
			{...props}
			inputProps={{format: '##/##/####', mask: '_', ...inputProps}}
			rules={{
				pattern: {
					message: t('uk-date-validation'),
					value: UK_DATE,
				},
				...rules,
			}}
		/>
	);
}