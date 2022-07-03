import axios, { AxiosError } from 'axios';

export const validateHuman = async (
  token: string | null | undefined
): Promise<boolean> => {
  if (token) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    try {
      const response = await axios({
        method: 'POST',
        url: `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data.success;
    } catch (e: AxiosError | any) {
      return false;
    }
  } else {
    return false;
  }
};
