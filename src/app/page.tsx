"use client";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import styles from "./page.module.css";
import { Translation } from '@/app/Translation';
import { Teaspoons } from '@/app/Teaspoons';

const roundToNearestTen = (grams: number) => Math.round(grams / 10) * 10;

const getWaterGrams = (flourGrams: number) => flourGrams * 0.7;
const getSaltGrams = (flourGrams: number) => Math.ceil(flourGrams * 0.02);
const getYestGrams = (flourGrams: number) => Math.ceil(flourGrams * 0.012);

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'it'>('it');

  const toggleLanguage = useCallback(() => {
    if (language === 'it') {
      setLanguage('en');
    } else {
      setLanguage('it');
    }
  }, [language]);

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
  const flourGramsSecondPart = (flourGrams - flourGramsFirstPart) / 2;
  const flourGramsThirdPart = (flourGrams - flourGramsFirstPart) / 2;
  const waterGrams = getWaterGrams(flourGrams);
  const coldWaterGrams = roundToNearestTen(waterGrams * 0.8);
  const warmWaterGrams = roundToNearestTen(waterGrams * 0.2);
  const saltGrams = getSaltGrams(flourGrams);
  const yestGrams = getYestGrams(flourGrams);

  return (
    <div id={styles.container}>
      <header id={styles.header}>
        <Image src="/logo.png" alt="My Pizza logo" height={36} width={36} />

        <h1 id={styles.claim}>
          <Translation language={language} translations={{
            en: 'The open-source recipe of my pizza!',
            it: 'La ricetta open-source della mia pizza!',
          }} />
        </h1>

        <button id={styles.flag} onClick={toggleLanguage}>
          {language === 'it' ? (
            <Image src="/italian.png" alt="US flag" height={34} width={34} />
          ) : (
            <Image src="/english.png" alt="Italian flag" height={34} width={34} />
          )}
        </button>
      </header>

      <main id={styles.main}>
        <div>
          <h2>
            <Translation
              language={language}
              translations={{
                en: 'Quantity',
                it: 'Quantità',
              }} />
          </h2>

          {peopleSelected ? (
            <div>
                <label htmlFor="number-of-people">
                <Translation
                  language={language}
                  translations={{
                    en: 'Number of people',
                    it: 'Numero di persone',
                  }}
                />
                </label>
              <div className={styles.form}>
                <button className={styles.button} disabled={numberOfPeopleSelected <= numberOfPeopleStep} onClick={onNumberOfPeopleChangeByButton(-numberOfPeopleStep)}>-</button>
                <input className={styles.input} id="number-of-people" min={numberOfPeopleStep} onChange={onNumberOfPeopleChangeByInput} step={numberOfPeopleStep} type="number" value={numberOfPeopleSelected} />
                <button className={styles.button} onClick={onNumberOfPeopleChangeByButton(numberOfPeopleStep)}>+</button>
              </div>
                <p>
                <Translation
                  language={language}
                  translations={{
                    en: 'Do you prefer to specify the quantity of flour you want to use?',
                    it: 'Preferisci specificare la quantità di farina che vuoi utilizzare?',
                  }}
                />
                {' '}
                <button onClick={onPeopleSelected(false)}>
                  <Translation
                  language={language}
                  translations={{
                    en: 'Click here!',
                    it: 'Clicca qui!',
                  }}
                  />
                </button>
                </p>
            </div>
          ) : (
            <div>
                <label htmlFor="flour-grams">
                <Translation
                  language={language}
                  translations={{
                    en: 'Grams of flour',
                    it: 'Grammi di farina',
                  }}
                />
                </label>
              <div className={styles.form}>
                <button className={styles.button} disabled={flourGramsSelected <= flourGramsStep} onClick={onFlourGramsChangeByButton(-flourGramsStep)}>-</button>
                <input className={styles.input} id="flour-grams" min={flourGramsStep} onChange={onFlourGramsChangeByInput} step={flourGramsStep} type="number" value={flourGramsSelected} />
                <button className={styles.button} onClick={onFlourGramsChangeByButton(flourGramsStep)}>+</button>
              </div>
                <p>
                  <Translation
                    language={language}
                    translations={{
                      en: 'Do you prefer to specify the number of people for which you want to make the pizza?',
                      it: 'Preferisci specificare il numero di persone per cui vuoi fare la pizza?',
                    }}
                  />
                  {' '}
                  <button onClick={onPeopleSelected(true)}>
                  <Translation
                    language={language}
                    translations={{
                      en: 'Click here!',
                      it: 'Clicca qui!',
                    }}
                  />
                  </button>
                </p>
            </div>
          )}
        </div>

        <div>
            <h2>
            <Translation
              language={language}
              translations={{
                en: 'Ingredients',
                it: 'Ingredienti',
              }}
            />
            </h2>

          <ul>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `${flourGrams} grams of flour`,
                  it: `${flourGrams} grammi di farina`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `${coldWaterGrams} grams of water at 10°C`,
                  it: `${coldWaterGrams} grammi di acqua a 10°C`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `${warmWaterGrams} grams of water at 28°C`,
                  it: `${warmWaterGrams} grammi di acqua a 28°C`,
                }}
              />
            </li>
            <li>
              {yestGrams}
              {' '}
              <Translation
                language={language}
                translations={{
                  en: 'grams of brewer\'s yeast',
                  it: 'grammi di lievito di birra',
                }}
              />
            </li>
            <li>
              {saltGrams}
              {' '}
              <Translation
                language={language}
                translations={{
                  en: 'grams of salt',
                  it: 'grammi di sale',
                }}
              />
              {' '}
              {'('}
              <Teaspoons language={language} teaspoons={saltGrams * 0.175} />
              {')'}
            </li>
          </ul>
        </div>

        <div>
          <h2>
            <Translation
              language={language}
              translations={{
                en: 'Preparation',
                it: 'Preparazione',
              }}
            />
          </h2>

          <ul className={styles.steps}>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Prepare ${coldWaterGrams} grams of water at 10°C in a container. To cool it down, you can put it in the fridge for 1 hour or in the freezer for 30 minutes.`,
                  it: `Prepariamo ${coldWaterGrams} grammi di acqua a 10°C in un recipiente. Per farla raffreddare, possiamo metterla in frigo per 1 ora oppure in freezer per 30 minuti.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Dissolve ${yestGrams} grams of yeast in ${warmWaterGrams} grams of water at 28°C in a container.`,
                  it: `Sciogliamo ${yestGrams} grammi di lievito in ${warmWaterGrams} grammi di acqua a 28°C in un recipiente.`,
                }} />
            </li>
            <li>
              <Translation
              language={language}
              translations={{
                en: `Pour ${flourGramsFirstPart} grams of flour on one side of the kneading trough or the bowl where the dough will be kneaded.`,
                it: `Versiamo ${flourGramsFirstPart} grammi di farina in un lato della madia o della ciotola dove avverrà l'impasto.`,
              }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Pour the water at 10°C on the other side of the kneading trough or the bowl.`,
                  it: `Versiamo l'acqua a 10°C nell'altro lato della madia o della ciotola.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Add salt to the water in the kneading trough and mix with your hand until the salt dissolves.`,
                  it: `Aggiungiamo il sale all'acqua nella madia e mescoliamo con la mano finché il sale non si scioglie.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Incorporate the flour a little at a time with your hand until the dough becomes homogeneous. The gradualness of the process is important to avoid the formation of lumps.`,
                  it: `Incorporiamo la farina un po' alla volta con la mano finché l'impasto non diventa omogeneo. La gradualità del processo è importante per evitare la formazione di grumi.`,
                }}
              />
            </li>

            <li>
              <Translation
                language={language}
                translations={{
                  en: `Gradually add the water with the yeast.`,
                  it: `Aggiungiamo gradualmente l'acqua con il lievito.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Gradually incorporate another ${flourGramsSecondPart} grams of flour.`,
                  it: `Incorporiamo gradualmente altri ${flourGramsSecondPart} grammi di farina.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Work the dough with your hands for 5-10 minutes until it comes off well from the kneading trough. During the processing, it is important to squeeze the dough by pulling it upwards so that it can take air.`,
                  it: `Lavoriamo l'impasto con le mani per 5-10 minuti finché non si stacca bene dalla madia. Durante la lavorazione è importante mozzare l'impasto, ovvero strizzarlo tirandolo verso l'alto, affinché possa prendere aria.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Let the dough rest for 30 minutes covering the kneading trough or the bowl with a cloth.`,
                  it: `Lasciamo riposare l'impasto per 30 minuti coprendo la madia o della ciotola con uno strofinaccio.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Incorporate another ${flourGramsThirdPart} grams of flour.`,
                  it: `Incorporiamo altri ${flourGramsThirdPart} grammi di farina.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Make folds to compact the structure of the pizza and promote good leavening.`,
                  it: `Facciamo delle pieghe per compattare la struttura della pizza e favorire una buona alveolatura.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Let the dough rest in the fridge for 20-24 hours.`,
                  it: `Lasciamo riposare l'impasto in frigo per 20-24 ore.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Divide the dough into loaves and let them rest for 2-3 hours.`,
                  it: `Stagliamo l'impasto in panetti e facciamoli riposare per 2-3 ore.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Roll out the dough, add the topping, and bake.`,
                  it: `Stendiamo l'impasto, condiamo la pizza, e inforniamo.`,
                }}
              />
            </li>
            <li>
              <Translation
                language={language}
                translations={{
                  en: `Enjoy your pizza!`,
                  it: `Buon appetito!`,
                }}
                />
            </li>
          </ul>
        </div>
      </main>
      <footer id={styles.footer}>
        <div>
          <Translation language={language} translations={{
            en: 'Website made with ❤️ by',
            it: 'Sito web realizzato con ❤️ da',
          }} />
          {' '}
          <a href="https://www.davidsorrentino.com">Dapids</a>
        </div>
      </footer>
    </div>
  );
}
