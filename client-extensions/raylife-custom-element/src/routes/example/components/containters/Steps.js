import React, {useContext} from 'react';
import {StepItem} from '../../../../common/components/fragments/Step/Item';
import {StepList} from '../../../../common/components/fragments/Step/List';
import {AppContext} from '../../context/AppContextProvider';
import {useStepWizard} from '../../hooks/useStepWizard';
import {AVAILABLE_STEPS} from '../../utils/constants';
import {useTranslation} from 'react-i18next';

export function Steps() {
	const {
		selectedStep: {section},
		setSection,
	} = useStepWizard();
	const {
		state: {
			dimensions: {
				device: {isMobile},
			},
			percentage,
		},
	} = useContext(AppContext);
	const {t} = useTranslation();

	return (
		<StepList>
			<StepItem
				isMobile={isMobile}
				onClick={() => setSection(AVAILABLE_STEPS.PERSONAL)}
				percentage={percentage[AVAILABLE_STEPS.PERSONAL.section]}
				selected={section === AVAILABLE_STEPS.PERSONAL.section}
			>
				{t(AVAILABLE_STEPS.PERSONAL.section)}
			</StepItem>

			<StepItem
				isMobile={isMobile}
				onClick={() => setSection(AVAILABLE_STEPS.ADDRESS)}
				percentage={percentage[AVAILABLE_STEPS.ADDRESS.section]}
				selected={section === AVAILABLE_STEPS.ADDRESS.section}
			>
				{t(AVAILABLE_STEPS.ADDRESS.section)}
			</StepItem>

			<StepItem
				isMobile={isMobile}
				onClick={() => setSection(AVAILABLE_STEPS.TERMS)}
				percentage={percentage[AVAILABLE_STEPS.TERMS.section]}
				selected={section === AVAILABLE_STEPS.TERMS.section}
			>
				{t(AVAILABLE_STEPS.TERMS.section)}
			</StepItem>
		</StepList>
	);
}
