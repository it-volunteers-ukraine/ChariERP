import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

const maxFileSize = 5;

export const validationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    nameMaterial: Yup.string().required(error('поле має бути заповненим')),
    category: Yup.string().required(error('поле має бути заповненим')),
    unitMeasurement: Yup.string().required(error('поле має бути заповненим')),
    storageLocation: Yup.string().required(error('поле має бути заповненим')),
    storageFloor: Yup.string().required(error('поле має бути заповненим')),
    originFinancing: Yup.string().required(error('поле має бути заповненим')),
    financing: Yup.string().required(error('поле має бути заповненим')),
    dateReceived: Yup.string().required(error('поле має бути заповненим')),
    price: Yup.string().required(error('поле має бути заповненим')),
    currency: Yup.string().required(error('поле має бути заповненим')),
    photo: Yup.mixed<File>()
      .required(error('поле має бути заповненим'))
      .test('fileSize', error('maxSizeFile', { maxSize: `${maxFileSize}` }), (value) => {
        if (value) {
          return value.size <= 1024 * 1024 * maxFileSize;
        }

        return true;
      })
      .test('fileType', error('extensionsFile', { extensions: '(jpg, jpeg, png, pdf)' }), (value) => {
        if (value) {
          return ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(value.type);
        }

        return true;
      }),
    description: Yup.string().required(error('поле має бути заповненим')),
  });
