

import React from 'react';
import { useI18n } from '../i18n';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useI18n();
  return (
    <div className="w-full max-w-lg p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center" role="alert">
      <p className="font-bold">{t('errors.title')}</p>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;
