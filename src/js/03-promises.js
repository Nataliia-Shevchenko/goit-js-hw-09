import Notiflix from 'notiflix';

const submitFormEl = document.querySelector('.form');

submitFormEl.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  for (let i = 0; i <= amount.value; i += 1) {
    let delayTime = delay.value + step.value * i;
    let positionPromise = i + 1;

    createPromise(positionPromise, delayTime)
      .then(({ positionPromise, delayTime }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${positionPromise} in ${delayTime} ms`
        );
      })
      .catch(({ positionPromise, delayTime }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${positionPromise} in ${delayTime} ms`
        );
      });
  }
  e.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
