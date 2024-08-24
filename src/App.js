import React, { useState } from "react"
import { CurrencyCodes } from "./CurrencyCodes";
import axios from "axios";
import { GoArrowSwitch } from "react-icons/go";

function App() {

  const [from, setFrom] = useState('AFN')
  const [to, setTo] = useState('AFN')
  const [amount,setAmount] = useState(0)
  const [responseData,setresponseData] = useState({})


  const style = {
    App: 'flex flex-col  w-full items-center',
    heading: 'text-4xl my-[32px]',
    form: 'm-[20px] text-center',
    selection: 'flex items-center  ',
    from: 'mx-[10px]',
    to: 'mx-[10px]',
    select: 'p-[10px] bg-orange-600 text-white rounded',
    icon: 'mx-[32px]',
    amount: 'p-[5px] my-[20px] outline',
    button: 'bg-blue-500 p-[5px] rounded text-white',
    result: 'text-2xl text-green-500 mt-[20px]'
  }

  

  const Convert = async () => {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/79e445698dc6ca7775a5afe0/pair/${from}/${to}/${amount}`)
    setresponseData(response.data)
    console.log(responseData);
  }
  console.log(responseData);



  return (
    <div className={style.App}>
      <h1 className={style.heading}>Currency Converter</h1>
      <div className={style.form}>
        <div className={style.selection}>
          <label htmlFor="from" className={style.from} >From</label>
          <select id="from" className={style.select} onChange={(e) => setFrom(e.target.value)}>
            {CurrencyCodes.length > 0 && (
              CurrencyCodes.map((c) => {
                return <option value={c}>{c}</option>
              })
            )}
          </select>
          <GoArrowSwitch className={style.icon} />
          <label htmlFor="to" className={style.to}>To</label>
          <select id="to" className={style.select} onChange={(e) => setTo(e.target.value)}>
            {CurrencyCodes.length > 0 && (
              CurrencyCodes.map((c) => {
                return <option value={c}>{c}</option>
              })
            )}
          </select>
        </div>
        <input type="text" value={amount} className={style.amount} placeholder="Amount..." onChange={(e) => setAmount(e.target.value)}/>
      </div>
      <button className={style.button} onClick={() => Convert()}>Convert</button>
      <p className={style.result}>{responseData === null ? " " : `${amount} ${from} equals to  ${responseData.conversion_result} ${to}`}</p>
    </div>
  );
}

export default App;
{/*  */ }