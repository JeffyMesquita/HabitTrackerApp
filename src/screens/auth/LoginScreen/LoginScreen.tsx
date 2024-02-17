import {Box, Button, Text} from '@components';

export function LoginScreen() {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Box
        style={{
          paddingHorizontal: 24,
        }}>
        <Text preset="headingLarge" italic bold>
          Hello World!
        </Text>
        <Text preset="headingMedium">Hello World!</Text>

        <Button title="Press me" marginBottom="s24" />

        <Button preset="outline" title="Outline" marginBottom="s24" />

        <Button title="Press me" loading />

        <Button disabled title="Press me" marginBottom="s24" />

        <Button disabled preset="outline" title="Outline" marginBottom="s24" />

        <Button disabled title="Press me" loading />
      </Box>
    </Box>
  );
}
