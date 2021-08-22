import { timeFormat } from "d3"
import { nest } from "d3-collection"

export const getMonth = d => {
  const date = new Date(d.Date)
  return timeFormat("%B %Y")(date)
}

export const groupDataIntoMonths = data => {
  const dataByMonth = nest()
    .key(d => getMonth(d))
    .entries(data)

  return dataByMonth
}

export const getMonthlySummaries = data => {
  const monthlySummaries = data.map(month => {
    const summary = month.values.reduce(
      (sum, day) => {
        return {
          Active: sum.Active + day.Active,
          Confirmed: sum.Confirmed + day.Confirmed,
          Deaths: sum.Deaths + day.Deaths,
          Recovered: sum.Recovered + day.Recovered
        }
      },
      {
        Active: 0,
        Confirmed: 0,
        Deaths: 0,
        Recovered: 0
      }
    )

    return {
      Date: month.values[0].Date,
      ...summary
    }
  })

  return monthlySummaries
}
