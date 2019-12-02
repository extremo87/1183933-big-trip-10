export const createRouteTemplate = (days) => {
  const startPoint = days[0].points[0].city.name;
  const finalPoint = days[days.length - 1].points[days[days.length - 1].points.length - 1].city.name;
  // TODO : redner dashes depending om point quantity
  return (`<div class="trip-info__main">
      <h1 class="trip-info__title">${startPoint} &mdash; ... &mdash; ${finalPoint}</h1>
    
      <p class="trip-info__dates">${days[0].date.format(`D MMM`)}&nbsp;&mdash;&nbsp; ${days[days.length - 1].date.format(`D MMM`)}</p>
    </div>`);
};
