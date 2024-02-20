import {AuthCredentialsAPI, AuthCredentialsData, authService} from '@domain';
import axios from 'axios';

/**
 * Cria uma instância do axios com a configuração base da API
 * Create an axios instance with the base configuration of the API
 * @see
 * - in Development:
 *  - Don't forget to start the server and the database
 *  - May be necessary to change the baseURL
 *  - May be necessary to change the Authorization token
 *  - May be necessary to change the port
 *    - `adb reverse tcp:3333 tcp:3333`
 *
 */

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/app/',
});

type InterceptorProps = {
  authCredentials: AuthCredentialsData | null;
  saveCredentials: (ac: AuthCredentialsData) => Promise<void>;
  removeCredentials: () => void;
};

export function registerInterceptor({
  authCredentials,
  saveCredentials,
  removeCredentials,
}: InterceptorProps) {
  const interceptor = api.interceptors.response.use(
    response => response,
    async responseError => {
      const failedRequest = responseError.config;
      const hasNotRefreshToken = !authCredentials?.refreshToken;
      const isRefreshTokenRequest =
        authService.isRefreshTokenRequest(failedRequest);
      if (responseError.response.status === 401) {
        if (hasNotRefreshToken || isRefreshTokenRequest || failedRequest.sent) {
          removeCredentials();
          return Promise.reject(responseError);
        }

        failedRequest.sent = true;

        const newAuthCredentials = await authService.authenticateByRefreshToken(
          authCredentials?.refreshToken,
        );

        saveCredentials(newAuthCredentials);
        failedRequest.headers.Authorization = `Bearer ${newAuthCredentials.token}`;

        return api(failedRequest);
      }

      return Promise.reject(responseError);
    },
  );

  // remove listener when component is unmounted
  return () => {
    api.interceptors.response.eject(interceptor);
  };
}
