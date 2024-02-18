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
