import { AppContextProvider } from './context/AppContextProvider';
import { FormProvider, useForm } from 'react-hook-form';
import { Template } from '../../common/components/Template';

const Providers = ({ children, initialValues }) => {
  const form = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  return (
    <AppContextProvider>
      <FormProvider {...form}>
        <Template>{children}</Template>
      </FormProvider>
    </AppContextProvider>
  );
};

const InitProvider = ({ children }) => {
  return <Providers>{children}</Providers>;
};

export default InitProvider;
