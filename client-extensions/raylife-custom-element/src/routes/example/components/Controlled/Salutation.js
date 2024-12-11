import { ClaySelect } from '@clayui/form';

import { ControlledSelect } from '../../../../common/components/connectors/Controlled/Select';
import { useTranslation } from 'react-i18next';

import { getSalutations } from '../../services/LiferayPickList';
import { useEffect, useState } from 'react';

export function SaluationControlledSelect({ rules, ...props }) {
  const { t } = useTranslation();
  const [salutations, setSalutations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setSalutations(await getSalutations());
      } catch {
        setSalutations([{ name: 'mr', value: 'Mr' }]);
      }
    }
    fetchData();
  }, []);

  return (
    <ControlledSelect {...props} rules={rules}>
      <ClaySelect.Option hidden label={t('select')} />

      {salutations &&
        salutations.map((salutation) => (
          <ClaySelect.Option
            key={salutation.name}
            label={salutation.value}
            value={salutation.name}
          />
        ))}
    </ControlledSelect>
  );
}
