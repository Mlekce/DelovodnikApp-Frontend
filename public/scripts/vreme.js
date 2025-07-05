let years = {
    2025: [
        "2025-01-01",
        "2025-01-02",
        "2025-01-07",
        "2025-02-15",
        "2025-02-16",
        "2025-02-17",
        "2025-04-18",
        "2025-04-19",
        "2025-04-20",
        "2025-04-21",
        "2025-05-01",
        "2025-05-02",
        "2025-11-11",
    ], 2026: [
        "2026-01-01",
        "2026-01-02",
        "2026-01-07",
        "2026-02-15",
        "2026-02-16",
        "2026-02-17",
        "2026-04-10",
        "2026-04-13",
        "2026-05-01",
        "2026-11-11"
    ]
}

const millisecondsInOneDay = 24 * 60 * 60 * 1000;

function formatDate(miliseconds) {
    const newDate = new Date(miliseconds);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function addDay(miliseconds) {
    let date = new Date(miliseconds);
    let newDate = date.getTime();
    newDate = newDate + 1 * millisecondsInOneDay;
    return newDate
}

function addSevenDays(dateString) {
    let date = new Date(dateString);
    let newDate = date.getTime() + 8 * millisecondsInOneDay;
    return newDate
}

function addMonth(dateString) {
    let date = new Date(dateString);
    let newDate = date.getTime() + 31 * millisecondsInOneDay;
    return newDate
}

function checkWeekend(miliseconds) {
    let date = new Date(miliseconds);
    let newDate = date.getTime();
    const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
    if (dayOfWeek === 6) { // Saturday
        newDate = newDate + 2 * millisecondsInOneDay;
    } else if (dayOfWeek === 0) { // Sunday
        newDate = newDate + 1 * millisecondsInOneDay;
    }
    return newDate
}

function checkHolliday(miliseconds) {
    let date = new Date(miliseconds);
    let newDate = date.getTime();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    let dateString = `${year}-${month}-${day}`
    const dayOfWeek = date.getDay();
    let x;
    if (years[year] && years[year].includes(dateString)) {
        x = addDay(newDate)
        return checkHolliday(x)
    }
    else if (dayOfWeek === 0 || dayOfWeek === 6) {
        x = checkWeekend(newDate)
        return checkHolliday(x)
    }
    else {
        return newDate
    }
}

function mainThirtyDays(inputDate) {
    const formattedDate = addMonth(inputDate);
    const weeks = checkWeekend(formattedDate);
    const holliday = checkHolliday(weeks);
    return formatDate(holliday);
}

function mainSevenDays(inputDate) {
    const formattedDate = addSevenDays(inputDate);
    const weeks = checkWeekend(formattedDate);
    const holliday = checkHolliday(weeks);
    return formatDate(holliday);
}

export { mainSevenDays, mainThirtyDays };

