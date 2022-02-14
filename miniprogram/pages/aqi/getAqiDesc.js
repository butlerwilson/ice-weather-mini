import Aqi from '../../utils/weather/aqi';

export default function getAqiDesc() {
  const keys = Object.keys(Aqi);

  let color = [],
    desc = [];

  keys.forEach(e => {
    const obj = Aqi[e];

    color.push(obj.gradientColor);

    desc.push({
      icon: obj.icon,
      name: obj.name,
      scope: `${obj.min}~${obj.max}`,
      desc: obj.desc,
    });
  });

  return { color: color.join(','), desc };
}
