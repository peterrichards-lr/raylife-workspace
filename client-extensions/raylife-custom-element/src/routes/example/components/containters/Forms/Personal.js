import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledInput } from '../../../../../common/components/connectors/Controlled/Input';
import { EmailControlledInput } from '../../../../../common/components/connectors/Controlled/Input/Email';
import { SaluationControlledSelect } from '../../connectors/Controlled/Salutation';
import useMobileContainer from '../../../hooks/useMobileContainer';
import { SUBSECTION_KEYS } from '../../../utils/constants';
import MobileContainer from '../../mobile/MobileContainer';

const setFormPath = (value) => `personal.${value}`;

export function FormPersonal({ form, isMobile }) {
  const { control, register, setValue } = useFormContext();
  const { getMobileSubSection, mobileContainerProps } = useMobileContainer();
  const { t } = useTranslation();

  return (
    <div className="p-0">
      <MobileContainer
        {...mobileContainerProps}
        mobileSubSection={getMobileSubSection(SUBSECTION_KEYS.YOUR_NAME)}
      >
        <div
          className={classNames('d-flex justify-content-between mb-5', {
            ['flex-wrap']: isMobile,
          })}
        >
          <SaluationControlledSelect
            control={control}
            inputProps={{
               className: classNames('flex-grow-1 p-0 mr-4', {
                  'col-12 mb-4': isMobile,
                }),            }}
            label={t(SUBSECTION_KEYS.SAULTATION)}
            name={setFormPath('salutation')}
            rules={{
              required: t('field-required'),
            }}
          />

          <ControlledInput
            control={control}
            inputProps={{
              autoFocus: true,
              className: classNames('flex-grow-1 p-0 mr-4', {
                'col-12 mb-4': isMobile,
              }),
              maxLength: 256
            }}
            label={t(SUBSECTION_KEYS.FORENAME)}
            name={setFormPath('forename')}
            rules={{
              required: t('forname-required'),
            }}
          />

          <ControlledInput
            control={control}
            inputProps={{
              className: 'flex-grow-1 p-0 ',
              maxLength: 256,
            }}
            label={t(SUBSECTION_KEYS.SURNAME)}
            name={setFormPath('surname')}
            rules={{
              required: t('surname-required'),
            }}
          />
        </div>
      </MobileContainer>

      <MobileContainer
        {...mobileContainerProps}
        mobileSubSection={getMobileSubSection(SUBSECTION_KEYS.EMAIL)}
      >
        <EmailControlledInput
          control={control}
          label={t(SUBSECTION_KEYS.EMAIL)}
          name={setFormPath('email')}
          rules={{
            required: t('email-required'),
          }}
        />
      </MobileContainer>
    </div>
  );
}
