"use client";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import styles from "./page.module.css";

const roundToNearestTen = (grams: number) => Math.round(grams / 10) * 10;

const getWaterGrams = (flourGrams: number) => flourGrams * 0.7;
const getSaltGrams = (flourGrams: number) => Math.ceil(flourGrams * 0.02);
const getYestGrams = (flourGrams: number) => Math.ceil(flourGrams * 0.012);

const humanizeTeaspoons = (teaspoons: number) => {
  const amounts = [{
    amount: '',
    value: 0,
  }, {
    amount: '1/4',
    value: 0.25,
  }, {
    amount: '1/2',
    value: 0.5,
  }, {
    amount: '3/4',
    value: 0.75,
  }, {
    amount: '1',
    value: 1
  }]

  const wholeAmount = Math.floor(teaspoons);
  const decimalAmount = teaspoons - wholeAmount;

  const closestAmount = amounts.reduce((closest, amount) => {
    if (Math.abs(amount.value - decimalAmount) < Math.abs(closest.value - decimalAmount)) {
      return amount;
    }

    return closest;
  }, amounts[0]);

  if (wholeAmount === 0) {
    return `${closestAmount.amount} di cucchiaino`;
  }

  if (wholeAmount === 1) {
    return closestAmount.amount ? `${wholeAmount} cucchiaino e ${closestAmount.amount}` : `${wholeAmount} cucchiaino`;
  }

  return closestAmount.amount ? `${wholeAmount} cucchiaini e ${closestAmount.amount}` : `${wholeAmount} cucchiaini`;
}

export default function Home() {
  const defaultFlourGrams = 350;
  const [flourGramsSelected, setFlourGramsSelected] = useState(defaultFlourGrams);

  const onFlourGramsChangeByInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFlourGramsSelected(Number(event.target.value));
  }, []);

  const flourGramsStep = 50;

  const onFlourGramsChangeByButton = useCallback((amount: number) => () => {
    setFlourGramsSelected((flourGrams) => flourGrams + amount);
  }, []);

  const defaultPeopleNumber = 2;
  const [numberOfPeopleSelected, setNumberOfPeopleSelected] = useState(defaultPeopleNumber);

  const onNumberOfPeopleChangeByInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeopleSelected(Number(event.target.value));
  }, []);

  const [peopleSelected, setPeopleSelected] = useState(false);

  const onPeopleSelected = useCallback((selected: boolean) => () => {
    setPeopleSelected(selected);
  }, []);

  const numberOfPeopleStep = 1;

  const onNumberOfPeopleChangeByButton = useCallback((amount: number) => () => {
    setNumberOfPeopleSelected((numberOfPeopleSelected) => numberOfPeopleSelected + amount);
  }, []);

  const flourGrams = peopleSelected ? numberOfPeopleSelected * 175 : flourGramsSelected;
  const flourGramsFirstPart = roundToNearestTen(flourGrams * 0.8);
  const flourGramsSecondPart = roundToNearestTen(flourGrams * 0.1);
  const flourGramsThirdPart = roundToNearestTen(flourGrams * 0.1);
  const waterGrams = getWaterGrams(flourGrams);
  const coldWaterGrams = roundToNearestTen(waterGrams * 0.8);
  const warmWaterGrams = roundToNearestTen(waterGrams * 0.2);
  const saltGrams = getSaltGrams(flourGrams);
  const saltTeaspoons = humanizeTeaspoons(saltGrams * 0.175);
  const yestGrams = getYestGrams(flourGrams);

  return (
    <div>
      <header id={styles.header}>
        <Image src="/logo.png" alt="My Pizza logo" height={60} width={60} />

        <h1 id={styles.claim}>La mia ricetta della pizza open-source!</h1>
      </header>

      <main id={styles.main}>
        <div>
          <h2>Quantità</h2>

          {peopleSelected ? (
            <div>
              <label htmlFor="number-of-people">Numero di persone</label>
              <div className={styles.form}>
                <button className={styles.button} disabled={numberOfPeopleSelected <= numberOfPeopleStep} onClick={onNumberOfPeopleChangeByButton(-numberOfPeopleStep)}>-</button>
                <input className={styles.input} id="number-of-people" min={numberOfPeopleStep} onChange={onNumberOfPeopleChangeByInput} step={numberOfPeopleStep} type="number" value={numberOfPeopleSelected} />
                <button className={styles.button} onClick={onNumberOfPeopleChangeByButton(numberOfPeopleStep)}>+</button>
              </div>
              <p>
                Preferisci specificare la quantità di farina che vuoi utilizzare? <button onClick={onPeopleSelected(false)}>Clicca qui!</button>
              </p>
            </div>
          ) : (
            <div>
              <label htmlFor="flour-grams">Grammi di farina</label>
              <div className={styles.form}>
                <button className={styles.button} disabled={flourGramsSelected <= flourGramsStep} onClick={onFlourGramsChangeByButton(-flourGramsStep)}>-</button>
                <input className={styles.input} id="flour-grams" min={flourGramsStep} onChange={onFlourGramsChangeByInput} step={flourGramsStep} type="number" value={flourGramsSelected} />
                <button className={styles.button} onClick={onFlourGramsChangeByButton(flourGramsStep)}>+</button>
              </div>
                <p>
                  Preferisci specificare il numero di persone per cui vuoi fare la pizza? <button onClick={onPeopleSelected(true)}>Clicca qui!</button>
                </p>
            </div>
          )}
        </div>

        <div>
          <h2>Ingredienti</h2>

          <ul>
            <li>{flourGrams} grammi di farina</li>
            <li>{coldWaterGrams} grammi di acqua a 10°C</li>
            <li>{warmWaterGrams} grammi di acqua a 28°C</li>
            <li>{yestGrams} grammi di lievito di birra</li>
            <li>{saltGrams} grammi ({saltTeaspoons}) di sale</li>
          </ul>
        </div>

        <div>
          <h2>Preparazione</h2>

          <ul className={styles.steps}>
            <li>
              Prepariamo {coldWaterGrams} grammi di acqua a 10°C in un recipiente. Per farla raffreddare, possiamo metterla in frigo per 1 ora oppure in freezer per 30 minuti.
            </li>
            <li>
              Sciogliamo {yestGrams} grammi di lievito in {warmWaterGrams} grammi di acqua a 28°C in un recipiente.
            </li>
            <li>
              Versiamo {flourGramsFirstPart} grammi di farina in un lato della madia o della ciotola dove avverrà l&apos;impasto.
            </li>
            <li>
              Versiamo l&apos;acqua a 10°C nell&apos;altro lato della madia.
            </li>
            <li>
              Aggiungiamo il sale all&apos;acqua nella madia e mescoliamo con la mano finché il sale non si scioglie.
            </li>
            <li>
              Incorporiamo la farina un po&apos; alla volta con la mano. La gradualità del processo è importante per evitare la formazione di grumi.
            </li>
            <li>
              Lavoriamo l&apos;impasto con le mani in modo che prenda aria. Durante la lavorazione è importante mozzarlo, ovvero strizzarlo tirandolo verso l&apos;alto.
            </li>
            <li>
              Aggiungiamo l&apos;acqua con il lievito e lavoriamo l&apos;impasto finché l&apos;acqua non viene completamente assorbita.
            </li>
            <li>
              Incorporiamo altri {flourGramsSecondPart} grammi di farina.
            </li>
            <li>
              Lavoriamo l&apos;impasto per 5/10 minuti finché non si stacca bene dalla madia.
            </li>
            <li>
              Lasciamo riposare l&apos;impasto per 30 minuti coprendo la madia o della ciotola con uno strofinaccio.
            </li>
            <li>
              Incorporiamo altri {flourGramsThirdPart} grammi di farina.
            </li>
            <li>
              Realizziamo delle pieghe finché l&apos;impasto non è incordato, ovvero fino a quando appare liscio, omogeneo, ed elastico.
            </li>
            <li>
              Lasciamo riposare l&apos;impasto in frigo per 20-24 ore.
            </li>
            <li>
              Stagliamo l&apos;impasto in panetti e facciamoli riposare per 2 o 3 ore.
            </li>
            <li>
              Stendiamo l&apos;impasto, condiamo la pizza, e inforniamo.
            </li>
            <li>
              Buon appetito!
            </li>
          </ul>
        </div>
      </main>
      <footer id={styles.footer}>
        Sito web realizzato con ❤️ da <a href="https://www.davidsorrentino.com">Dapids</a>.
      </footer>
    </div>
  );
}
