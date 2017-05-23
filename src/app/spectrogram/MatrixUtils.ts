/**
 * Created by lucast on 23/05/2017.
 */

export function estimatePercentile(matrix, percentile) {
  // our sample is not evenly distributed across the whole data set:
  // it is guaranteed to include at least one sample from every
  // column, and could sample some values more than once. But it
  // should be good enough in most cases (todo: show this)
  if (matrix.length === 0) {
    return 0.0;
  }
  const w = matrix.length;
  const h = matrix[0].length;
  const n = w * h;
  const m = (n > 50000 ? 50000 : n); // should base that on the %ile
  let m_per = Math.floor(m / w);
  if (m_per < 1) {
    m_per = 1;
  }

  const sample = [];
  for (let x = 0; x < w; ++x) {
    for (let i = 0; i < m_per; ++i) {
      const y = Math.floor(Math.random() * h);
      const value = matrix[x][y];
      if (!isNaN(value) && value !== Infinity) {
        sample.push(value);
      }
    }
  }
  if (sample.length === 0) {
    return 0.0;
  }
  sample.sort((a, b) => { return a - b; });
  const ix = Math.floor((sample.length * percentile) / 100);
  const estimate = sample[ix];
  return estimate;
}
