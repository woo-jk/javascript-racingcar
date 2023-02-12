import Car from "./Car.js";
import RandomNumberGenerator from "../util/RandomNumberGenerator.js";

class RacingGame {
  #cars;
  #tryCount;

  constructor(carNames, tryCount) {
    const carNamesArray = carNames.split(",");
    this.#cars = carNamesArray.map((name) => new Car(name));
    this.#tryCount = tryCount;
  }

  raceOneTurn() {
    this.#cars.forEach((car) => {
      const randomNumber = RandomNumberGenerator.generate();
      car.move(randomNumber);
    });
    this.#tryCount -= 1;
  }

  isGameComplete() {
    return this.#tryCount === 0;
  }

  getCarsResultOfOneTurn() {
    return this.#cars.map((car) => ({ name: car.getName(), currentDistance: car.getCurrentDistance() }));
  }

  #calculateWinners(car, winners, maxDistance) {
    if (car.getCurrentDistance() === maxDistance) winners.push(car.getName());
    if (car.getCurrentDistance() > maxDistance) {
      winners = [];
      winners.push(car.getName());
      maxDistance = car.getCurrentDistance();
    }
    return { newWinners: winners, newMaxDistance: maxDistance };
  }

  getWinners() {
    let winners = [];
    let maxDistance = 0;
    this.#cars.forEach((car) => {
      const { newWinners, newMaxDistance } = this.#calculateWinners(car, winners, maxDistance);
      winners = newWinners;
      maxDistance = newMaxDistance;
    });
    return winners;
  }
}

export default RacingGame;
