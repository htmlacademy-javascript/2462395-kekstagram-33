const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

// загрузка данных
export const fetchData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка загрузки данных: ${error.message}`);
  }
};

// отправка данных
export const sendData = async (formData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Ошибка отправки данных: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Ошибка отправки данных: ${error.message}`);
  }
};

