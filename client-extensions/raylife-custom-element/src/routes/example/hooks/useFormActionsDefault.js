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
import { smoothScroll } from '../../../common/utils/scroll';
import { AppContext } from '../context/AppContextProvider';
import { useStepWizard } from './useStepWizard';
import { createOrUpdateExample } from '../services/Example';
import { useTranslation } from 'react-i18next';
import { OBJECT_MESSAGE } from '../utils/constants';

/**
 *
 * @param {String} form <useWatch>
 * @param {String?} previousSection
 * @param {String?} nextSection
 * @param {String?} errorMessage
 * @returns
 */

const useFormActions = ({ form, nextSection, previousSection }) => {
  const [exampleId, setExampleId] = useState();
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
    if (exampleId) {
      setValue('personal.exampleId', exampleId);

      const createDate = new Date().toISOString().split('T')[0];
      setValue('personal.exampleCreateDate', createDate);

      Storage.setItem(STORAGE_KEYS.EXAMPLE_ID, exampleId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exampleId]);

  useEffect(() => {
    Storage.setItem(STORAGE_KEYS.EXAMPLE_FORM, JSON.stringify(form));
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
    try {
      setError('serverValidation', null);
      const response = await createOrUpdateExample(form);

      if (response) {
        setExampleId(response.data.id);

        if (nextSection) {
          setSection(nextSection);

          return smoothScroll();
        }

        return response;
      }
    } catch (e) {
      if (e.isAxiosError) {
        if (e?.response?.status === 400) {
          setError('serverValidation', {
            message: e.response?.data?.title || 'Unexepcted validation error',
          });
        } else if (e?.response?.status === 403) {
          setError('exampleObject', {
            message: t(OBJECT_MESSAGE.EXAMPLE.DISABLED),
          });
        } else {
          console.error(e);
        }
        return;
      }

      console.error(e);
      return;
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
