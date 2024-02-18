import {Box, Button, FormPinInput, Screen, Text} from '@components';
import {AuthScreenProps} from '@routes';
import {useForm} from 'react-hook-form';
import {ConfirmEmailSchema, confirmEmailSchema} from './ConfirmEmailSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback, useRef, useState} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {useResetNavigationSuccess} from '@hooks';
import {useAuthConfirmEmail} from '@domain';
import {useToastService} from '@services';

export function ConfirmEmailScreen({
  navigation,
}: AuthScreenProps<'ConfirmEmailScreen'>) {
  const {reset} = useResetNavigationSuccess();
  const {showToast} = useToastService();

  const {isLoading, confirmEmail} = useAuthConfirmEmail({
    onError: message => showToast({message, type: 'error'}),
    onSuccess: () => showToast({message: 'E-mail confirmado com sucesso!'}),
  });

  const {control, formState, handleSubmit} = useForm<ConfirmEmailSchema>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
    },
    mode: 'onChange',
  });

  // type field = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

  function submitForm({
    code1,
    code2,
    code3,
    code4,
    code5,
    code6,
  }: ConfirmEmailSchema) {
    const code = `${code1}${code2}${code3}${code4}${code5}${code6}`;

    confirmEmail({code});

    reset({
      title: `Seu e-mail foi confirmado com sucesso!`,
      description:
        'Agora você já pode fazer login e aproveitar todos os recursos do app.',
      icon: {
        name: 'checkRound',
        color: 'success',
      },
    });
  }

  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="s8">
        Acesse seu e-mail para confirmar o cadastro
      </Text>

      <Text preset="paragraphLarge" mb="s40">
        Enviamos um e-mail para você com um código de confirmação. Acesse seu
        e-mail e digite o código para confirmar o cadastro.
      </Text>

      <Box flexDirection="row" width="100%" justifyContent="center" gap="s12">
        <FormPinInput
          control={control}
          maxLength={1}
          name="code1"
          hasError={!!formState.errors.code1}
          focusable
        />

        <FormPinInput
          control={control}
          maxLength={1}
          name="code2"
          hasError={!!formState.errors.code2}
          focusable
        />

        <FormPinInput
          control={control}
          maxLength={1}
          name="code3"
          hasError={!!formState.errors.code3}
        />

        <FormPinInput
          control={control}
          maxLength={1}
          name="code4"
          hasError={!!formState.errors.code4}
        />

        <FormPinInput
          control={control}
          maxLength={1}
          name="code5"
          hasError={!!formState.errors.code5}
        />

        <FormPinInput
          control={control}
          maxLength={1}
          name="code6"
          hasError={!!formState.errors.code6}
        />
      </Box>

      <Button
        title="Confirmar"
        mt="s48"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
