import { Translation } from '@/app/Translation'

type Props = {
  language: 'en' | 'it'
  teaspoons: number
}

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

export const Teaspoons = ({ language, teaspoons }: Props) => {
  const roundedTeaspoons = Math.round(teaspoons * 4) / 4;

  const wholeAmount = Math.floor(roundedTeaspoons);
  const decimalAmount = roundedTeaspoons - wholeAmount;

  const closestAmount = amounts.reduce((closest, amount) => {
    if (Math.abs(amount.value - decimalAmount) < Math.abs(closest.value - decimalAmount)) {
      return amount;
    }

    return closest;
  }, amounts[0]);

  if (wholeAmount === 0) {
    return <Translation language={language} translations={{ en: `${closestAmount.amount} teaspoon`, it: `${closestAmount.amount} di cucchiaino`}} />
  }

  if (wholeAmount === 1) {
    return <Translation language={language} translations={{ en: closestAmount.amount ? `${wholeAmount} and ${closestAmount.amount} teaspoons` : `${wholeAmount} teaspoon`, it: closestAmount.amount ? `${wholeAmount} cucchiaino e ${closestAmount.amount}` : `${wholeAmount} cucchiaino`}} />
  }

  return <Translation language={language} translations={{ en: closestAmount.amount ? `${wholeAmount} and ${closestAmount.amount} teaspoons` : `${wholeAmount} teaspoons`, it: closestAmount.amount ? `${wholeAmount} cucchiaini e ${closestAmount.amount}` : `${wholeAmount} cucchiaini`}} />
}
