export const convertDate = dateInput => {
  const fullDate = new Date(dateInput)
  let date = `${fullDate.getDate()}`
  let month = `${fullDate.getMonth() + 1}`
  const year = fullDate.getFullYear()

  if (date.length < 2) {
    date = `0${date}`
  }
  if (month.length < 2) {
    month = `0${month}`
  }

  return `${year}-${month}-${date}`
}