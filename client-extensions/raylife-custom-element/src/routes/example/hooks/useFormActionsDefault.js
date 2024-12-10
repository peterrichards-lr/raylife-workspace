/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */
import { useCallback, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  STORAGE_KEYS,
  Storage,
} from '../../../common/services/liferay/storage';
import { redirectTo } from '../../../common/utils/liferay';
import { smoothScroll } from '../../../common/utils/scroll';
import { AppContext } from '../context/AppContextProvider';
import { AVAILABLE_STEPS } from '../utils/constants';
import { useStepWizard } from './useStepWizard';
import { useTranslation } from 'react-i18next';

/**
 *
 * @param {String} form <useWatch>
 * @param {String?} previousSection
 * @param {String?} nextSection
 * @param {String?} errorMessage
 * @returns
 */

const useFormActions = ({ form, nextSection, previousSection }) => {
  const [applicationId, setApplicationId] = useState();
  const { setError, setValue } = useFormContext();
  const { setSection } = useStepWizard();
  const {
    state: { selectedStep },
  } = useContext(AppContext);
  const { t } = useTranslation();

  /**
   * @description When the application is created, we set the value to Form Context
   * We tried to use setValue directly on goToPrevious and goToNextForm
   * and for reasons unknowns, the section is not called.
   */

  useEffect(() => {
    if (applicationId) {
      setValue('basics.applicationId', applicationId);

      const createDate = new Date().toISOString().split('T')[0];
      setValue('basics.applicationCreateDate', createDate);

      Storage.setItem(STORAGE_KEYS.APPLICATION_ID, applicationId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  useEffect(() => {
    Storage.setItem(STORAGE_KEYS.APPLICATION_FORM, JSON.stringify(form));
  }, [form]);

  const _onValidation = useCallback(() => {
    let validated = true;
    return validated;
  }, [form, nextSection]);

  const onPrevious = useCallback(async () => {
    if (previousSection) {
      setSection(previousSection);
    }

    smoothScroll();
  }, [previousSection, setSection]);

  /**
   * @state disabled for now
   * @param {*} data
   */
  const onNext = useCallback(async () => {
    if (nextSection) {
      setSection(nextSection);

      return smoothScroll();
    }
  }, [
    selectedStep.index,
    form,
    setError,
    _onValidation,
    nextSection,
    setSection,
  ]);

  return { onNext, onPrevious };
};

export default useFormActions;
