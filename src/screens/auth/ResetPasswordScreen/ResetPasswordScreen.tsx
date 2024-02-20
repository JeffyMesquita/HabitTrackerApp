import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {AuthScreenProps} from '@routes';
import {ResetPasswordSchema, resetPasswordSchema} from './ResetPasswordSchema';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToastService} from '@services';
import {useAuthResetPassword} from '@domain';
import {useEffect} from 'react';
import {useResetNavigationSuccess} from '@hooks';

export function ResetPasswordScreen({
  route,
  navigation,
}: AuthScreenProps<'ResetPasswordScreen'>) {
  const {showToast} = useToastService();
  const {reset} = useResetNavigationSuccess();
  const {email} = route?.params;

  const defaultValues = {
    email,
    tempPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const {isLoading, resetPassword, result} = useAuthResetPassword({
    onError: message => showToast({message, type: 'error'}),
  });

  const {control, formState, handleSubmit} = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
    mode: 'onChange',
  });

  function submitForm({email, tempPassword, newPassword}: ResetPasswordSchema) {
    resetPassword({email, tempPassword, newPassword});
  }

  useEffect(() => {
    if (result?.code === '@PASSWORD_RESETED') {
      showToast({
        message: 'Senha redefinida com sucesso.',
        type: 'success',
        duration: 3500,
      });

      reset({
        title: 'Sua senha foi redefinida!',
        description: 'Agora você pode fazer login com sua nova senha.',
        icon: {
          name: 'checkRound',
          color: 'success',
        },
      });
    }
  }, [result]);

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s8">
        Redefinir senha
      </Text>

      <Text preset="paragraphLarge" mb="s40">
        Insira o código que enviamos para o seu e-mail e crie uma nova senha.
      </Text>

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{
          mb: 's20',
        }}
        readOnly
      />

      <FormTextInput
        control={control}
        name="tempPassword"
        label="Código de verificação"
        placeholder="Digite o código de verificação"
        boxProps={{
          mb: 's20',
        }}
      />

      <FormPasswordInput
        control={control}
        name="newPassword"
        label="Nova senha"
        placeholder="Digite sua nova senha"
        boxProps={{
          mb: 's20',
        }}
      />

      <FormPasswordInput
        control={control}
        name="confirmPassword"
        label="Confirmar senha"
        placeholder="Digite sua nova senha novamente"
        boxProps={{
          mb: 's20',
        }}
      />

      <Button
        title="Criar sua conta"
        mt="s48"
        loading={isLoading}
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
