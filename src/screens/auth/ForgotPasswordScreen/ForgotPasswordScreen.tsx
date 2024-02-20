import {Button, FormTextInput, Screen, Text, TextInput} from '@components';
import {useForm} from 'react-hook-form';
import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from './ForgotPasswordSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthForgotPassword} from '@domain';
import {useToastService} from '@services';
import {AuthScreenProps} from '@routes';
import {useEffect} from 'react';

const defaultValues = {
  email: '',
};

export function ForgotPasswordScreen({
  navigation,
}: AuthScreenProps<'ForgotPasswordScreen'>) {
  const {showToast} = useToastService();
  const {forgotPassword, isLoading, result} = useAuthForgotPassword({
    onError: message => showToast({message, type: 'error'}),
  });

  console.log(result);

  const {control, formState, handleSubmit, watch} =
    useForm<ForgotPasswordSchema>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues,
      mode: 'onChange',
    });

  function submitForm({email}: ForgotPasswordSchema) {
    forgotPassword({email});
  }

  useEffect(() => {
    if (result?.token) {
      showToast({
        message: 'Um e-mail de recuperação foi enviado.',
        type: 'success',
        duration: 3500,
      });

      navigation.navigate('ResetPasswordScreen', {email: watch('email')});
    }
  }, [result]);

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s8">
        Esqueci minha senha
      </Text>

      <Text preset="paragraphLarge" mb="s40">
        Insira seu e-mail para recuperar sua senha
      </Text>

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{
          mb: 's20',
        }}
      />

      <Button
        title="Recuperar senha"
        mt="s48"
        loading={isLoading}
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
