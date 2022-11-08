//fetch API data
export const getAPIdata = (apiLink) => {
  return fetch(
    apiLink
).then(response => {
      if (response.status === 200) return response.json();
      else throw new Error("Invalid response");
});
};