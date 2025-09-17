'use client';

import {
  useForm,
  type RegisterOptions,
  type SubmitHandler,
  type UseFormProps,
} from 'react-hook-form';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  websiteUrl: string;
  visaTypes: string[];
  resume: FileList | null;
  moreInfo: string;
}

const defaultValues: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  websiteUrl: '',
  visaTypes: [],
  resume: null,
  moreInfo: '',
};

const validationRules: Partial<
  Record<keyof FormData, RegisterOptions<FormData>>
> = {
  firstName: {
    required: 'First name is required',
  },
  lastName: {
    required: 'Last name is required',
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\S+@\S+$/i,
      message: 'Please enter a valid email address',
    },
  },
  country: {
    required: 'Country is required',
  },
  websiteUrl: {
    required: 'Website URL is required',
    pattern: {
      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      message: 'Please enter a valid URL',
    },
  },
  visaTypes: {},
  resume: {},
  moreInfo: {
    required: 'Please tell us how we can help you',
  },
};

interface UseFormValidationProps
  extends Omit<UseFormProps<FormData>, 'defaultValues'> {
  onSubmit: SubmitHandler<FormData>;
}

export function useFormValidation({
  onSubmit,
  ...formProps
}: UseFormValidationProps) {
  const form = useForm<FormData>({
    defaultValues,
    ...formProps,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  // Custom handlers for complex form fields
  const handleVisaChange = (visa: string, checked: boolean) => {
    const currentTypes = watch('visaTypes') || [];
    const newTypes = checked
      ? [...currentTypes, visa]
      : currentTypes.filter((v) => v !== visa);
    setValue('visaTypes', newTypes);

    // Limpar erro quando pelo menos um visa tipo é selecionado
    if (newTypes.length > 0) {
      form.clearErrors('visaTypes');
    }

    // Trigger validation for this field
    void form.trigger('visaTypes');
  };

  const handleFileSelect = (file: File | null) => {
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      setValue('resume', dataTransfer.files);
      // Limpar erro quando arquivo é selecionado
      form.clearErrors('resume');
    } else {
      setValue('resume', null);
    }
    // Trigger validation for this field
    void form.trigger('resume');
  };

  // Enhanced register function with validation rules
  const registerField = (fieldName: keyof FormData) => {
    return register(fieldName, validationRules[fieldName] ?? {});
  };

  // Custom submit handler with validation
  const customHandleSubmit = handleSubmit(async (data) => {
    // Validar visaTypes manualmente antes do submit
    const visaTypes = watch('visaTypes') || [];
    if (!Array.isArray(visaTypes) || visaTypes.length === 0) {
      form.setError('visaTypes', {
        type: 'required',
        message: 'Please select at least one visa type',
      });
      return;
    }

    // Validar resume manualmente antes do submit
    const resume = watch('resume');
    if (!resume || (resume instanceof FileList && resume.length === 0)) {
      form.setError('resume', {
        type: 'required',
        message: 'Please upload your resume/CV',
      });
      return;
    }

    // Se chegou até aqui, tudo válido - prosseguir com o submit
    await onSubmit(data);
  });

  return {
    ...form,
    registerField,
    handleSubmit: customHandleSubmit,
    handleVisaChange,
    handleFileSelect,
    watchedVisaTypes: watch('visaTypes'),
    watchedResume: watch('resume'),
    errors,
  };
}
