import * as yup from 'yup';

export const AnalyzeImageValidationSchema = yup.object().shape({
  keyword: yup.string().required('Keyword is required'),
  labels: yup
    .array()
    .of(yup.string().required("Label can't be empty"))
    .min(1, 'At least one label is required')
    .required('Labels are required'),
});

