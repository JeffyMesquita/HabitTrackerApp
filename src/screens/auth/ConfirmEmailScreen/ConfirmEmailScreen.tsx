import {Box, Button, FormPinInput, PinInput, Screen, Text} from '@components';
import {AuthScreenProps} from '@routes';
import {Controller, useForm} from 'react-hook-form';
import {ConfirmEmailSchema, confirmEmailSchema} from './ConfirmEmailSchema';
import {zodResolver} from '@hookform/resolvers/zod';
import {useCallback, useRef, useState} from 'react';
import {TextInput as RNTextInput, Keyboard} from 'react-native';
import {useResetNavigationSuccess} from '@hooks';
import {useAuthConfirmEmail} from '@domain';
import {useToastService} from '@services';

export function ConfirmEmailScreen({
  navigation,
}: AuthScreenProps<'ConfirmEmailScreen'>) {
  const {reset} = useResetNavigationSuccess();
  const {showToast} = useToastService();

  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  const {isLoading, confirmEmail} = useAuthConfirmEmail({
    onError: message => showToast({message, type: 'error'}),
    onSuccess: () => showToast({message: 'E-mail confirmado com sucesso!'}),
  });

  const {control, formState, handleSubmit, setValue} =
    useForm<ConfirmEmailSchema>({
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

  type field = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

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
        title="Confirmar"
        mt="s48"
        disabled={!formState.isValid}
        onPress={handleSubmit(submitForm)}
      />
    </Screen>
  );
}
