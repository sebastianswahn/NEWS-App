document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculateBtn");

  calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateInput();
    console.log(calculatePoints(document.querySelectorAll("input")));
  });
});

function validateInput() {
  const input = document.querySelectorAll("input");

  console.log(input);

  if (
    isNaN(input[0].value) ||
    isNaN(input[1].value) ||
    isNaN(input[2].value) ||
    isNaN(input[4].value) ||
    isNaN(input[5].value) ||
    (input[1].value !== "" && input[2].value !== "") ||
    (input[1].value === "" && input[2].value === "")
  ) {
    alert(
      "Please fill in all fields and ensure either you didnt put values to both Oxygen Saturation and Oxygen Saturation 2, you can only include 1"
    );
  }
}

function calculatePoints(input) {
  const pointsInput0 = getPointsForRange(parseFloat(input[0].value), [
    { min: 0, max: 8, points: 3 },
    { min: 9, max: 11, points: 1 },
    { min: 12, max: 20, points: 0 },
    { min: 21, max: 24, points: 2 },
    { min: 25, max: 100, points: 3 },
  ]);

  const pointsInput1 =
    input[1].value !== ""
      ? getPointsForRange(parseFloat(input[1].value), [
          { min: 0, max: 91, points: 3 },
          { min: 92, max: 93, points: 2 },
          { min: 94, max: 95, points: 1 },
          { min: 96, max: 100, points: 0 },
        ])
      : 0;

  const pointsInput2 = getPointsForRange(parseFloat(input[2].value), [
    { min: 0, max: 83, points: 3 },
    { min: 84, max: 85, points: 2 },
    { min: 86, max: 87, points: 1 },
    { min: 88, max: 92, points: 0 },
    { min: 93, max: 94, points: 1 }, //with oxygen
    { min: 95, max: 96, points: 2 }, //with oxygen
    { min: 97, max: 100, points: 3 }, //with oxygen going to make a function that calculates the points for the oxygen saturation depending on if the user has checked the oxygen checkbox or not
  ]);

  const pointsInput4 = getPointsForRange(parseFloat(input[4].value), [
    { min: 0, max: 90, points: 3 },
    { min: 91, max: 100, points: 2 },
    { min: 101, max: 110, points: 1 },
    { min: 111, max: 219, points: 0 },
    { min: 220, max: 500, points: 3 },
  ]);

  const pointsInput5 = getPointsForRange(parseFloat(input[5].value), [
    { min: 0, max: 40, points: 3 },
    { min: 41, max: 50, points: 1 },
    { min: 51, max: 90, points: 0 },
    { min: 91, max: 110, points: 1 },
    { min: 111, max: 130, points: 2 },
    { min: 131, max: 500, points: 3 },
  ]);

  const pointsInput6 = getPointsForRange(parseFloat(input[6].value), [
    { min: 20, max: 35.0, points: 3 },
    { min: 35.1, max: 36.0, points: 1 },
    { min: 36.1, max: 38.0, points: 0 },
    { min: 38.1, max: 39.0, points: 1 },
    { min: 39.1, max: 100, points: 3 },
  ]);

  const selectElement = document.getElementById("temperature");
  const pointsInput7 = getPointsForSelect(selectElement.value);

  return (
    pointsInput0 +
    pointsInput1 +
    pointsInput2 +
    pointsInput4 +
    pointsInput5 +
    pointsInput6 +
    pointsInput7
  );
}

function getPointsForSelect(selectedOption) {
  switch (selectedOption) {
    case "Alert":
      return 0;
    case "Voice":
      return 3;
    case "Pain":
      return 3;
    case "Unresponsive":
      return 3;
  }
}

function getPointsForRange(value, ranges) {
  for (const range of ranges) {
    if (value >= range.min && value <= range.max) {
      return range.points;
    }
  }
  return 0;
}

console.log(calculatePoints(document.querySelectorAll("input")));
