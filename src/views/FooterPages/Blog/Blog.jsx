import React from 'react'
import Footer from '../../Components/Footer'
import ProductsSolutions from './ProductsSolutions'
import Industries from './Industries'
import Ourstory from'./Ourstory'
import Ourservices from './Ourservices'
import Ourpartners from './Ourpartners'
import Ourclients from './Ourclients'
import Ourblogs from './Ourblogs'

export default function Blog() {
  return (
    <div>
      <ProductsSolutions />
      <Industries />
      <Ourstory/>
      <Ourservices/>
      <Ourpartners/>
      <Ourblogs/>
      <Ourclients/>
    </div>
  )
}
