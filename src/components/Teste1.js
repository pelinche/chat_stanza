import React , { useState, useEffect } from 'react';


const Teste1 = () => {
  console.log('carregou aqui');
  const [age, setAge] = useState(50);


    console.log('Age: '+age);
    const handleClick = () => setAge(age + 1)
    const someValue = { value: "someValue" }
    const doSomething = () => {
      return someValue
    }


  return (
    <div>
      <button  onClick={handleClick}>{age}</button>
      
    </div>
  )
}

export default Teste1;