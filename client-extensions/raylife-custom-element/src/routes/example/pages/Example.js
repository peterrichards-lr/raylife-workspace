import React, { useContext, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import Providers from '../Providers';
import { Steps } from '../components/containters/Steps';
import { useStepWizard } from '../hooks/useStepWizard';
import { AppContext } from '../context/AppContextProvider';
import {FormLayout} from '../components/containters/Forms';

import { useTranslation } from 'react-i18next';
import { getCurrentLanguageKey } from '../../../common/utils/liferay';

import { AVAILABLE_STEPS } from '../utils/constants';

/**
 * @description Since Raylife contains fragments and elements out of our scope
 * We need to rewrite some behavior for this elements, according to layout size
 * @param {Boolean} isMobileDevice
 */

const adaptRaylifeLayout = (isMobile) => {
  if (isMobile) {
    document
      .querySelector('section#content')
      ?.setAttribute('class', 'raylife-mobile');
  }

  document
    .querySelector('.example-structure .step-list')
    ?.setAttribute(
      'style',
      isMobile
        ? 'overflow-x: auto; overflow-y: hidden; height: 39px;'
        : 'justify-content-center'
    );
};

const ExampleApp = () => {
  const form = useWatch();
  const { selectedStep } = useStepWizard();
  const {
    state: {
      dimensions: {
        device: { isMobile },
      },
    },
  } = useContext(AppContext);

  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(getCurrentLanguageKey());
  }, []);

  useEffect(() => {
    adaptRaylifeLayout(isMobile);
  }, [isMobile]);

  return (
    <div className="d-flex example-structure justify-content-between">
      <Steps />

      <main className="d-flex flex-wrap justify-content-lg-start justify-content-md-center">
        <h2 className="display-4 mb-6 mx-6 step-title">
          {t(selectedStep.title)}
        </h2>

        <FormLayout form={form} />
      </main>
    </div>
  );
};

const Example = () => (
  <Providers>
    <ExampleApp />
  </Providers>
);

export default Example;
