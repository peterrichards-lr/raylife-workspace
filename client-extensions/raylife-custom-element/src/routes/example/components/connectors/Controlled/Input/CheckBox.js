export function CheckBoxControlled({ children, rules, ...props }) {
  const { t } = useTranslation();

  <Controller
    control={control}
    defaultValue=""
    name={name}
    render={({ field, fieldState }) => (
      <ClayCheckbox checked={value} onChange={() => setValue((val) => !val)} />
    )}
    rules={rules}
    {...props}
  />;
}
