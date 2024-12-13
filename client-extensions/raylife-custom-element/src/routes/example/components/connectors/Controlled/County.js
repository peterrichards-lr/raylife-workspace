import { ClaySelect } from '@clayui/form';

import { ControlledSelect } from '../../../../../common/components/connectors/Controlled/Select';
import { useTranslation } from 'react-i18next';

import { getCounties } from '../../../services/LiferayPickList';
import { useEffect, useState } from 'react';

export function CountyControlledSelect({ rules, ...props }) {
  const { t } = useTranslation();
  const [counties, setCounties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
      setCounties(await getCounties());
      } catch {
        setCounties([{name:"test", value: "test"}]);
      }
    }
    fetchData();
  }, []);

  return (
    <ControlledSelect {...props} rules={rules}>
      <ClaySelect.Option hidden label={t('select')} />

      {counties &&
        counties.map((county) => (
          <ClaySelect.Option
            key={county.name}
            label={county.value}
            value={county.name}
          />
        ))}
    </ControlledSelect>
  );
}
