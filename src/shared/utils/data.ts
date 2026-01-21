export const formatDate = (dateString: string) : string => {
  const date = new Date(dateString);
  return date.getDay() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}