import { ref } from 'vue';

const cookieCount = ref(parseInt(localStorage.getItem('cookieCount')) || 0);
const cookieFactoryCount = ref(parseInt(localStorage.getItem('cookieFactoryCount')) || 1);
const cookieAutoClickCount = ref(parseInt(localStorage.getItem('cookieAutoClickCount')) || 0);
setInterval(() => {
    cookieCount.value += cookieAutoClickCount.value;
    localStorage.setItem('cookieCount',cookieCount.value.toString());

}, 200);


export function useCookies() {
  function cookieClick() {
    cookieCount.value += 1 * cookieFactoryCount.value;
    localStorage.setItem('cookieCount', cookieCount.value.toString());
  }
  function upgradeFactory(factoryCost) {
    if (cookieCount.value >= factoryCost) {
        cookieCount.value -= factoryCost;
        cookieFactoryCount.value*=2;
        localStorage.setItem('cookieCount', cookieCount.value.toString())
        localStorage.setItem('cookieFactoryCount', cookieFactoryCount.value.toString())
    }

  }
  function upgradeAutoClick(autoClickCost) {
    if (cookieCount.value >= autoClickCost) {
        cookieCount.value -= autoClickCost;
        cookieAutoClickCount.value+=1;
        localStorage.setItem('cookieCount', cookieCount.value.toString())
        localStorage.setItem('cookieAutoClickCount', cookieAutoClickCount.value.toString())
    }
}
  
  return { cookieCount, cookieClick, upgradeFactory, upgradeAutoClick }


}

