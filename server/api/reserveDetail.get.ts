export default defineEventHandler(async (event) => {
  const data = await useStorage().getItem('redis:reserveDetail');
  console.log(data, 'data');
  return data;
});
