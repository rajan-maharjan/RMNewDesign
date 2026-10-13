/**
 * Rajan Maharjan - Nepali Bikram Sambat (BS) & English (AD) Date Engine
 * Converted and ported from Rajan Maharjan's nepaliCalendar PHP class
 * Supports conversion between AD 1944-2033 and BS 2000-2090
 */

const NepaliCalendar = (() => {
  // The calendar data aligns BS 2000 Poush 17 with Gregorian 1944-01-01.
  // Bikram Sambat calendar mapping matrix [BS Year, Baisakh ... Chaitra]
  const bsData = [
    [2000,30,32,31,32,31,30,30,30,29,30,29,31],
    [2001,31,31,32,31,31,31,30,29,30,29,30,30],
    [2002,31,31,32,32,31,30,30,29,30,29,30,30],
    [2003,31,32,31,32,31,30,30,30,29,29,30,31],
    [2004,30,32,31,32,31,30,30,30,29,30,29,31],
    [2005,31,31,32,31,31,31,30,29,30,29,30,30],
    [2006,31,31,32,32,31,30,30,29,30,29,30,30],
    [2007,31,32,31,32,31,30,30,30,29,29,30,31],
    [2008,31,31,31,32,31,31,29,30,30,29,29,31],
    [2009,31,31,32,31,31,31,30,29,30,29,30,30],
    [2010,31,31,32,32,31,30,30,29,30,29,30,30],
    [2011,31,32,31,32,31,30,30,30,29,29,30,31],
    [2012,31,31,31,32,31,31,29,30,30,29,30,30],
    [2013,31,31,32,31,31,31,30,29,30,29,30,30],
    [2014,31,31,32,32,31,30,30,29,30,29,30,30],
    [2015,31,32,31,32,31,30,30,30,29,29,30,31],
    [2016,31,31,31,32,31,31,29,30,30,29,30,30],
    [2017,31,31,32,31,31,31,30,29,30,29,30,30],
    [2018,31,32,31,32,31,30,30,29,30,29,30,30],
    [2019,31,32,31,32,31,30,30,30,29,30,29,31],
    [2020,31,31,31,32,31,31,30,29,30,29,30,30],
    [2021,31,31,32,31,31,31,30,29,30,29,30,30],
    [2022,31,32,31,32,31,30,30,30,29,29,30,30],
    [2023,31,32,31,32,31,30,30,30,29,30,29,31],
    [2024,31,31,31,32,31,31,30,29,30,29,30,30],
    [2025,31,31,32,31,31,31,30,29,30,29,30,30],
    [2026,31,32,31,32,31,30,30,30,29,29,30,31],
    [2027,30,32,31,32,31,30,30,30,29,30,29,31],
    [2028,31,31,32,31,31,31,30,29,30,29,30,30],
    [2029,31,31,32,31,32,30,30,29,30,29,30,30],
    [2030,31,32,31,32,31,30,30,30,29,29,30,31],
    [2031,30,32,31,32,31,30,30,30,29,30,29,31],
    [2032,31,31,32,31,31,31,30,29,30,29,30,30],
    [2033,31,31,32,32,31,30,30,29,30,29,30,30],
    [2034,31,32,31,32,31,30,30,30,29,29,30,31],
    [2035,30,32,31,32,31,31,29,30,30,29,29,31],
    [2036,31,31,32,31,31,31,30,29,30,29,30,30],
    [2037,31,31,32,32,31,30,30,29,30,29,30,30],
    [2038,31,32,31,32,31,30,30,30,29,29,30,31],
    [2039,31,31,31,32,31,31,29,30,30,29,30,30],
    [2040,31,31,32,31,31,31,30,29,30,29,30,30],
    [2041,31,31,32,32,31,30,30,29,30,29,30,30],
    [2042,31,32,31,32,31,30,30,30,29,29,30,31],
    [2043,31,31,31,32,31,31,29,30,30,29,30,30],
    [2044,31,31,32,31,31,31,30,29,30,29,30,30],
    [2045,31,32,31,32,31,30,30,29,30,29,30,30],
    [2046,31,32,31,32,31,30,30,30,29,29,30,31],
    [2047,31,31,31,32,31,31,30,29,30,29,30,30],
    [2048,31,31,32,31,31,31,30,29,30,29,30,30],
    [2049,31,32,31,32,31,30,30,30,29,29,30,30],
    [2050,31,32,31,32,31,30,30,30,29,30,29,31],
    [2051,31,31,31,32,31,31,30,29,30,29,30,30],
    [2052,31,31,32,31,31,31,30,29,30,29,30,30],
    [2053,31,32,31,32,31,30,30,30,29,29,30,30],
    [2054,31,32,31,32,31,30,30,30,29,30,29,31],
    [2055,31,31,32,31,31,31,30,29,30,29,30,30],
    [2056,31,31,32,31,32,30,30,29,30,29,30,30],
    [2057,31,32,31,32,31,30,30,30,29,29,30,31],
    [2058,30,32,31,32,31,30,30,30,29,30,29,31],
    [2059,31,31,32,31,31,31,30,29,30,29,30,30],
    [2060,31,31,32,32,31,30,30,29,30,29,30,30],
    [2061,31,32,31,32,31,30,30,30,29,29,30,31],
    [2062,31,31,31,32,31,31,29,30,29,30,29,31],
    [2063,31,31,32,31,31,31,30,29,30,29,30,30],
    [2064,31,31,32,32,31,30,30,29,30,29,30,30],
    [2065,31,32,31,32,31,30,30,30,29,29,30,31],
    [2066,31,31,31,32,31,31,29,30,30,29,29,31],
    [2067,31,31,32,31,31,31,30,29,30,29,30,30],
    [2068,31,31,32,32,31,30,30,29,30,29,30,30],
    [2069,31,32,31,32,31,30,30,30,29,29,30,31],
    [2070,31,31,31,32,31,31,29,30,30,29,30,30],
    [2071,31,31,32,31,31,31,30,29,30,29,30,30],
    [2072,31,32,31,32,31,30,30,29,30,29,30,30],
    [2073,31,32,31,32,31,30,30,30,29,29,30,31],
    [2074,31,31,31,32,31,31,30,29,30,29,30,30],
    [2075,31,31,32,31,31,31,30,29,30,29,30,30],
    [2076,31,32,31,32,31,30,30,30,29,29,30,30],
    [2077,31,32,31,32,31,30,30,30,29,30,29,31],
    [2078,31,31,31,32,31,31,30,29,30,29,30,30],
    [2079,31,31,32,31,31,31,30,29,30,29,30,30],
    [2080,31,32,31,32,31,30,30,30,29,29,30,30],
    [2081,31,31,32,32,31,30,30,30,29,30,30,30],
    [2082,31,31,32,31,31,31,30,29,30,29,30,30],
    [2083,31,31,32,31,31,30,30,30,29,30,30,30],
    [2084,31,31,32,31,31,30,30,30,29,30,30,30],
    [2085,31,32,31,32,30,31,30,30,29,30,30,30],
    [2086,30,32,31,32,31,30,30,30,29,30,30,30],
    [2087,31,31,32,31,31,31,30,30,29,30,30,30],
    [2088,30,31,32,32,30,31,30,30,29,30,30,30],
    [2089,30,32,31,32,31,30,30,30,29,30,30,30],
    [2090,30,32,31,32,31,30,30,30,29,30,30,30]
  ];

  const nepaliMonths = [
    "बैशाख", "जेष्ठ", "आषाढ", "श्रावन", "भाद्र", "असोज",
    "कार्तिक", "मंसिर", "पौष", "माघ", "फागुन", "चैत्र"
  ];

  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const nepaliDays = [
    "आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"
  ];

  const englishDays = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

  function toNepaliNumerals(num) {
    return String(num).split('').map(char => {
      const n = parseInt(char, 10);
      return !isNaN(n) ? nepaliDigits[n] : char;
    }).join('');
  }

  function isLeapYear(year) {
    if (year % 100 === 0) {
      return year % 400 === 0;
    }
    return year % 4 === 0;
  }

  function engToNep(yy, mm, dd) {
    yy = parseInt(yy, 10);
    mm = parseInt(mm, 10);
    dd = parseInt(dd, 10);

    if (yy < 1944 || yy > 2033 || mm < 1 || mm > 12 || dd < 1 || dd > 31) {
      return null;
    }

    const date = new Date(Date.UTC(yy, mm - 1, dd));
    if (date.getUTCMonth() !== mm - 1 || date.getUTCDate() !== dd) return null;

    const epoch = Date.UTC(1944, 0, 1);
    let daysFromEpoch = Math.floor((date.getTime() - epoch) / 86400000);
    if (daysFromEpoch < 0) return null;

    let yearIndex = 0;
    let month = 9;
    let day = 17;
    while (yearIndex < bsData.length) {
      const monthLength = bsData[yearIndex][month];
      const daysToNextMonth = monthLength - day + 1;
      if (daysFromEpoch < daysToNextMonth) {
        day += daysFromEpoch;
        const year = bsData[yearIndex][0];
        const dayOfWeek = date.getUTCDay();
        return {
          year,
          month,
          date: day,
          nmonth: nepaliMonths[month - 1],
          day: nepaliDays[dayOfWeek],
          eday: englishDays[dayOfWeek],
          nepaliYearNum: toNepaliNumerals(year),
          nepaliDateNum: toNepaliNumerals(day),
          formattedNepali: `${toNepaliNumerals(day)} ${nepaliMonths[month - 1]}, ${toNepaliNumerals(year)} (${nepaliDays[dayOfWeek]})`
        };
      }
      daysFromEpoch -= daysToNextMonth;
      month++;
      day = 1;
      if (month > 12) {
        month = 1;
        yearIndex++;
      }
    }
    return null;
  }

  function nepToEng(yy, mm, dd) {
    yy = parseInt(yy, 10);
    mm = parseInt(mm, 10);
    dd = parseInt(dd, 10);

    if (yy < 2000 || yy > 2090 || mm < 1 || mm > 12 || dd < 1) {
      return null;
    }

    const yearIndex = yy - 2000;
    const bsYear = bsData[yearIndex];
    if (!bsYear || dd > bsYear[mm]) return null;

    let daysFromEpoch = 0;
    if (yearIndex === 0) {
      if (mm < 9 || (mm === 9 && dd < 17)) return null;
      if (mm === 9) {
        daysFromEpoch = dd - 17;
      } else {
        daysFromEpoch = bsData[0][9] - 17 + 1;
        for (let month = 10; month < mm; month++) daysFromEpoch += bsData[0][month];
        daysFromEpoch += dd - 1;
      }
    } else {
      for (let month = 9; month <= 12; month++) daysFromEpoch += bsData[0][month];
      daysFromEpoch -= 16;
      for (let year = 1; year < yearIndex; year++) {
        for (let month = 1; month <= 12; month++) daysFromEpoch += bsData[year][month];
      }
      for (let month = 1; month < mm; month++) daysFromEpoch += bsYear[month];
      daysFromEpoch += dd - 1;
    }

    const date = new Date(Date.UTC(1944, 0, 1) + daysFromEpoch * 86400000);
    const curYear = date.getUTCFullYear();
    const curMonth = date.getUTCMonth() + 1;
    const curDay = date.getUTCDate();
    const dayOfWeek = date.getUTCDay();

    return {
      year: curYear,
      month: curMonth,
      date: curDay,
      emonth: englishMonths[curMonth - 1],
      day: englishDays[dayOfWeek],
      nday: nepaliDays[dayOfWeek],
      formattedEnglish: `${curDay} ${englishMonths[curMonth - 1]} ${curYear}, ${englishDays[dayOfWeek]}`
    };
  }

  function getToday() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const nep = engToNep(y, m, d);

    return {
      ad: {
        year: y,
        month: m,
        date: d,
        monthName: englishMonths[m - 1],
        dayName: englishDays[now.getDay()],
        formatted: `${d} ${englishMonths[m - 1]} ${y}, ${englishDays[now.getDay()]}`
      },
      bs: nep
    };
  }

  return {
    engToNep,
    nepToEng,
    getToday,
    nepaliMonths,
    englishMonths,
    nepaliDays,
    englishDays,
    toNepaliNumerals
  };
})();

// Attach to global window or CommonJS module
if (typeof window !== 'undefined') {
  window.NepaliCalendar = NepaliCalendar;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NepaliCalendar;
}
