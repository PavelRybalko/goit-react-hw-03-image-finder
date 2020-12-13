const apiKey = '18705092-a3d0db19a14bd823df17dac7b';

const fetchImages = ({ searchQuery = '', page = 1, pageSize = 12 }) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Упс, произошла ошибка`));
  });
};

const api = {
  fetchImages,
};

export default api;
