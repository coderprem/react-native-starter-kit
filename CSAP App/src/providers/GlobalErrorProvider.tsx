import React, {
    createContext,
    useEffect,
    useState,
  } from 'react';
  
  import AppErrorModal from '../components/AppErrorModal';
  import GlobalErrorService from '../network/GlobalErrorService';
  
  interface ErrorState {
    visible: boolean;
    title: string;
    message: string;
  }
  
  const initialState: ErrorState = {
    visible: false,
    title: '',
    message: '',
  };
  
  interface GlobalErrorProviderProps {
    children: React.ReactNode;
  }
  
  export const GlobalErrorProvider = ({
    children,
  }: GlobalErrorProviderProps) => {
    const [error, setError] =
      useState<ErrorState>(initialState);
  
    useEffect(() => {
      GlobalErrorService.setListener(
        (title, message) => {
          setError({
            visible: true,
            title,
            message,
          });
        },
      );
  
      return () => {
        GlobalErrorService.clearListener();
      };
    }, []);
  
    const closeError = () => {
      setError(initialState);
    };
  
    return (
      <>
        {children}
  
        <AppErrorModal
          visible={error.visible}
          title={error.title}
          message={error.message}
          onClose={closeError}
        />
      </>
    );
  };