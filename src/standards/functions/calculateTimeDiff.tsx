export default function CalculateTimeDiff(postedTime: Date) {


    var currentDate = new Date().getTime();
    var postedDate = postedTime.getTime();
    var difference = currentDate - postedDate;
    let daysDiff = Math.floor(difference / (1000 * 3600 * 24));
    var finalDifferenceText = "Posted " + daysDiff.toString() + " day(s) ago";
    if (daysDiff == 0) {
        var hourDiff = Math.floor(difference / (1000 * 3600));
        finalDifferenceText = "Posted " + hourDiff.toString() + " hour(s) ago";
        if (hourDiff == 0) {
            var minuteDiff = Math.floor(difference / (1000 * 60));
            finalDifferenceText = "Posted " + minuteDiff.toString() + " minute(s) ago";
        }
    }

    return finalDifferenceText;

}