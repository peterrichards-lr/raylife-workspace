import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledInput } from '../../../../../common/components/connectors/Controlled/Input';
import { CountyControlledSelect } from '../../connectors/Controlled/County';
import useMobileContainer from '../../../hooks/useMobileContainer';
import { SUBSECTION_KEYS } from '../../../utils/constants';
import MobileContainer from '../../mobile/MobileContainer';
import {UK_POSTCODE_REGEX} from '../../../utils/patterns';

const setFormPath = (value) => `address.${value}`;

export function FormAddress({ form, isMobile }) {
  const { control, register, setValue } = useFormContext();
  const { getMobileSubSection, mobileContainerProps } = useMobileContainer();
  const { t } = useTranslation();
  return (
    <div className="p-0">
      <MobileContainer
        {...mobileContainerProps}
        mobileSubSection={getMobileSubSection(SUBSECTION_KEYS.ADDRESS)}
      >
        <ControlledInput
          control={control}
          inputProps={{
            className: 'mb-5 mr-0',
          }}
          label={t(SUBSECTION_KEYS.ADDRESS)}
          name={setFormPath('address')}
          rules={{ required: t('address-validation') }}
        />

        <ControlledInput
          control={control}
          inputProps={{
            className: 'mb-5 mr-0',
          }}
          label={t(SUBSECTION_KEYS.LOCALITY)}
          name={setFormPath('locality')}
        />

        <ControlledInput
          control={control}
          inputProps={{
            className: 'mb-5 mr-0',
          }}
          label={t(SUBSECTION_KEYS.CITY)}
          name={setFormPath('city')}
          rules={{ required: t('city-validation') }}
        />

        <div
          className={classNames('d-flex justify-content-between mb-5', {
            ['flex-wrap']: isMobile,
          })}
        >
          <CountyControlledSelect
            control={control}
            inputProps={{
              className: 'col-sm-12 col-md-6 col-lg-6 pr-sm-4 pr-xs-0 p-0',
            }}
            label={t(SUBSECTION_KEYS.COUNTY)}
            name={setFormPath('county')}
            rules={{ required: t('county-validation') }}
          />
          <ControlledInput
            control={control}
            inputProps={{
              className: 'col-sm-12 col-md-6 col-lg-6 pr-sm-4 pr-xs-0 p-0',
            }}
            label={t(SUBSECTION_KEYS.POSTCODE)}
            name={setFormPath('postcode')}
            rules={{ required: t('postcode-validation'),
              pattern: {
                message: t('postcode-uk-validation'),
                value: UK_POSTCODE_REGEX,
              },
             }}
          />
        </div>
      </MobileContainer>
    </div>
  );
}
