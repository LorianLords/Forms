import { string } from 'yup';

export const pictureToBase64 = (file: FileList) => {
  if (file && file.length > 0) {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        console.log(file[0]);
        reader.readAsDataURL(file[0]);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error('Ошибка при конвертации файла в Base64:', error);
    }
  }
};
