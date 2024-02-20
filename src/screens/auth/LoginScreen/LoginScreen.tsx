import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useAuthSignIn} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {AuthScreenProps} from '@routes';
import {useToastService} from '@services';
import {useForm} from 'react-hook-form';

import {LoginSchema, loginSchema} from './LoginSchema';

export function LoginScreen({navigation}: AuthScreenProps<'LoginScreen'>) {
  const {showToast} = useToastService();

  const {isLoading, signIn} = useAuthSignIn({
    onError: message => showToast({message, type: 'error'}),
  });

  const {control, formState, handleSubmit} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function submitForm({email, password}: LoginSchema) {
    signIn({email, password});
  }

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }

  function navigateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen');
  }

  return (
    <Screen scrollable>
      <Text preset="headingLarge" mb="s8">
        Olá Tracker!
      </Text>

      <Text preset="paragraphLarge" mb="s40">
        Digite seu e-mail e senha para acessar sua conta.
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

      <FormPasswordInput
        control={control}
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        boxProps={{
          mb: 's20',
        }}
      />

      <Text
        onPress={navigateToForgotPasswordScreen}
        color="primary"
        preset="paragraphSmall"
        bold>
        Esqueci minha senha
      </Text>

      <Button
        title="Entrar"
        mt="s48"
        loading={isLoading}
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
      <Button
        preset="outline"
        title="Criar uma conta"
        mt="s12"
        onPress={navigateToSignUpScreen}
      />
    </Screen>
  );
}
