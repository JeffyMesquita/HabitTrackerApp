import {
  Button,
  FormPasswordInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useAuthRegister} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {useToastService} from '@services';
import {useForm} from 'react-hook-form';

import {SignUpSchema, signUpSchema} from './SignUpSchema';

export function SignUpScreen() {
  const {showToast} = useToastService();

  const navigation = useNavigation();

  const {isLoading, register} = useAuthRegister({
    onError: message => showToast({message, type: 'error'}),
  });

  const {control, formState, handleSubmit} = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  function submitForm({email, password, firstName}: SignUpSchema) {
    register({
      email,
      password,
      firstName,
    });

    navigation.navigate('ConfirmEmailScreen');
  }

  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s8">
        Criar uma conta
      </Text>

      <Text preset="paragraphLarge" mb="s40">
        Acompanhe suas atividades e organize sua vida.
      </Text>

      <FormTextInput
        control={control}
        name="firstName"
        label="Seu primeiro nome"
        placeholder="Digite seu nome"
        boxProps={{
          mb: 's20',
        }}
      />

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

      <FormPasswordInput
        control={control}
        name="confirmPassword"
        label="Confirmar senha"
        placeholder="Digite sua senha novamente"
        boxProps={{
          mb: 's40',
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
