import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledCheckBox } from '../../../../../../common/components/connectors/Controlled/CheckBox';
import { ScrollableContent } from '../../../../../../common/components/fragments/Forms/ScrollableContent';
import { useTranslation } from 'react-i18next';
import { Label } from '../../../../../../common/components/fragments/Forms/Label';

export function TermsAndConditions({
  label,
  required,
  acceptanceLabel,
  name,
  children,
  rules,
  renderActions
}) {
  const [disabled, setDisabled] = useState(true);
  const { control } = useFormContext();
  const { t } = useTranslation();
  const handleAtBottom = () => {
    setDisabled(false);
  };
  return (
    <div className="terms-and-conditions">
      {label && (
        <Label label={label} name={name} required={required}>
          {renderActions}
        </Label>
      )}
      <ScrollableContent className="scrollable-area mb-3" onAtBottom={handleAtBottom}>
        {children}
      </ScrollableContent>
      <ControlledCheckBox
        control={control}
        name={name}
        label={acceptanceLabel}
        rules={{
          ...rules,
          required: t('acceptance-validation'),
        }}
        disabled={disabled}
      />
    </div>
  );
}
