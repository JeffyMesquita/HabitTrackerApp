import {ToastService} from './toastTypes';
// import {useToastContext} from './useToastContext';
import {useToastServiceZustand, useToastZustand} from './useToastZustand';

export function useToast(): ToastService['toast'] {
  // const {toast} = useToastContext();

  // return toast;
  return useToastZustand();
}

export function useToastService(): Pick<
  ToastService,
  'showToast' | 'hideToast'
> {
  // const {showToast, hideToast} = useToastContext();

  // return {showToast, hideToast};
  return useToastServiceZustand();
}

// here we are using Zustand to manage the state of the toast
// we are using Zustand because it is a very simple state management library
// and it is very easy to use and understand
// but we could use any other state management library like Redux, Mobx, Recoil, etc
// the other option would be to use the Context API, but it would be more verbose
// and the code would be more difficult to understand
