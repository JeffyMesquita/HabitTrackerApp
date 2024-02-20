import {useEffect, useRef} from 'react';
import {Keyboard, TextInput as RNTextInput} from 'react-native';

import {Box, Button, PinInput, Screen, Text} from '@components';
import {useAuthConfirmEmail} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useResetNavigationSuccess} from '@hooks';
import {AuthScreenProps} from '@routes';
import {useToastService} from '@services';
import {Controller, useForm} from 'react-hook-form';

import {ConfirmEmailSchema, confirmEmailSchema} from './ConfirmEmailSchema';

type field = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

const defaultValues = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
  code5: '',
  code6: '',
};

export function ConfirmEmailScreen({}: AuthScreenProps<'ConfirmEmailScreen'>) {
  const {reset} = useResetNavigationSuccess();
  const {showToast} = useToastService();

  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  const {isLoading, confirmEmail, result} = useAuthConfirmEmail({
    onError: message => showToast({message, type: 'error'}),
  });

  const {control, formState, handleSubmit} = useForm<ConfirmEmailSchema>({
    resolver: zodResolver(confirmEmailSchema),
    defaultValues,
    mode: 'onChange',
  });

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
  }

  useEffect(() => {
    if (result?.data?.token) {
      showToast({
        message: 'Um novo e-mail de confirmação foi enviado.',
        type: 'error',
        duration: 3500,
      });
    }
  }, [result]);

  useEffect(() => {
    if (result?.data?.attempts) {
      showToast({
        message: `Código inválido. você usou ${result.data.attempts} de 3 tentativas.`,
        type: 'error',
        duration: 3500,
      });
    }
  }, [result]);

  useEffect(() => {
    if (result?.data?.confirmed) {
      showToast({
        message: 'Cadastro confirmado',
        type: 'success',
        duration: 3500,
      });
      reset({
        title: 'Seu e-mail foi confirmado com sucesso!',
        description:
          'Agora você já pode fazer login e aproveitar todos os recursos do app.',
        icon: {
          name: 'checkRound',
          color: 'success',
        },
      });
    }
  }, [result, reset, showToast]);

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
        {[1, 2, 3, 4, 5, 6].map(index => (
          <Controller
            key={index}
            control={control}
            name={`code${index}` as field}
            rules={{required: 'Campo obrigatório'}}
            render={({field, fieldState}) => (
              <PinInput
                ref={ref => (inputRefs.current[index - 1] = ref)}
                value={field.value}
                onChangeText={(value: string) => {
                  field.onChange(value);
                  if (value && index < 6) {
                    inputRefs.current[index]?.focus();
                  }
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && !field.value) {
                    inputRefs.current[index - 2]?.focus();
                  }
                }}
                hasError={!!fieldState.error?.message}
                maxLength={1}
                onSubmitEditing={() =>
                  index === 6
                    ? Keyboard.dismiss()
                    : inputRefs.current[index]?.focus()
                }
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="number-pad"
              />
            )}
          />
        ))}
      </Box>

      <Button
        loading={isLoading}
        title="Confirmar"
        mt="s48"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
