import {Button, Screen, Text, TextInput} from '@components';

export function ForgotPasswordScreen() {
  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s8">
        Esqueci minha senha
      </Text>

      <Text preset="paragraphLarge" mb="s40">
        Insira seu e-mail para recuperar sua senha
      </Text>

      <TextInput
        label="E-mail"
        placeholder="Digite seu e-mail"
        errorMessage="Campo obrigatório"
        boxProps={{
          mb: 's40',
        }}
      />

      <Button title="Recuperar senha" mt="s48" onPress={() => {}} />
    </Screen>
  );
}
