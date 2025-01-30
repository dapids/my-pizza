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
  const defaultFlourGrams = 300;
  const [flourGrams, setFlourGrams] = useState(defaultFlourGrams);

  const onFlourGramsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFlourGrams(Number(event.target.value));
  }, []);

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
        <Image src="/logo.png" alt="My Pizza logo" height={70} width={70} />

        <h1 id={styles.claim}>La mia ricetta della pizza open-source!</h1>
      </header>

      <main id={styles.main}>
        <div id={styles.form}>
          <div className={styles.input}>
            <label htmlFor="flour-grams">Grammi di farina</label>
            <input defaultValue={defaultFlourGrams} id="flour-grams" min="10" onChange={onFlourGramsChange} step="10" type="number" />
          </div>
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
          <p>
            Sciogliere {yestGrams} grammi di lievito in {warmWaterGrams} grammi di acqua a 28°C.
          </p>
          <p>
            Versare {flourGramsFirstPart} grammi di farina in un lato della madia.
          </p>
          <p>
            Versare {coldWaterGrams} grammi di acqua a 10°C nell&apos;altro lato della madia.
          </p>
          <p>
            Aggiungere {saltGrams} grammi ({saltTeaspoons}) di sale all&apos;acqua nella madia e mescolare con la mano finché il sale non si scioglie.
          </p>
          <p>
            Incorporare la farina un po&apos; alla volta con la mano. La gradualità del processo è importante per evitare la formazione di grumi.
          </p>
          <p>
            Lavorare l&apos;impasto con le mani in modo che prenda aria e mozzarlo (ovvero srtizzarlo tirandolo verso l&apos;alto).
          </p>
          <p>
            Aggiungere l&apos;acqua con il lievito e lavorare finché l&apos;acqua non viene completamente assorbita.
          </p>
          <p>
            Incorporare {flourGramsSecondPart} grammi di farina.
          </p>
          <p>
            Lavorare l&apos;impasto per 5/10 minuti finché non si stacca bene dalla madia.
          </p>
          <p>
            Far riposare l&apos;impasto per 30 minuti.
          </p>
          <p>
            Incorporare {flourGramsThirdPart} grammi di farina.
          </p>
          <p>
            Realizzare delle pieghe finché l&apos;impasto è incordiato, ovvero fino a quando appare liscio, omogeneo ed elastico.
          </p>
          <p>
            Lasciare riposare l&apos;impasto in frigo per 12-18 ore.
          </p>
          <p>
            Stagliare l&apos;impasto in panetti e farli riposare per 2 ore.
          </p>
          <p>
            Stendere l&apos;impasto, condire la pizza, e infornare.
          </p>
        </div>
      </main>
    </div>
  );
}
