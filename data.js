/* Reviewed values: NSO report 06/01/2026, footnote [2]. Do not mix vintages. */
window.STORY_DATA = Object.freeze({
  gdp: [6.41,5.50,5.55,6.42,6.99,6.69,6.94,7.47,7.36,2.87,2.55,8.54,4.98,7.04,8.02].map((value,i)=>({year:2011+i,value})),
  poverty: [{year:2010,value:16.8},{year:2020,value:5.0}],
  accessed: '2026-10-04',
  gdpSource: 'https://www.nso.gov.vn/du-lieu-va-so-lieu-thong-ke/2026/01/bao-cao-tinh-hinh-kinh-te-xa-hoi-quy-iv-va-nam-2025/',
  povertySource: 'https://www.worldbank.org/vi/country/vietnam/publication/2022-vietnam-poverty-and-equity-assessment-report'
});
